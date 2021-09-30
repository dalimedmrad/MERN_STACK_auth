const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require ('bcrypt');


module.exports = {

    register : async(req,res) => {
        const{name,lastName,email,password} = req.body;
        try{
            const newUser = new User({name,lastName,email,password});
            // check if the email exist 
            const searchedUser = await User.findOne({email});
            if(searchedUser) return res.status(400).send({msg:"email already exist"});
            // hash password 
            const salt = 10;
            const genSalt = await bcrypt.genSalt(salt);
            const hashedPassword = await bcrypt.hash(password,genSalt);
            newUser.password = hashedPassword;
            
            const newUserToken = await newUser.save();
            const payload = {
                _id:newUserToken._id,
                name:newUserToken.name,
            };
            const token = await jwt.sign(payload,process.env.SecretOrKey,{expiresIn:3600});
            res.status(200).send({user:newUserToken,msg:"user is saved",token:`Bearer ${token}`});
        }catch(error){
            res.status(500).send("can not save the user");
        }
    },

    login: async(req,res) =>{
        const {email,password} = req.body;
        try{
            const searchedUser = await User.findOne({email});
            if(!searchedUser) return res.status(400).send({msg:"bad Credential"});

            const  match = await bcrypt.compare(password,searchedUser.password);
            if(!match) return res.status(400).send({msg:"bad Credential"});
            const payload = {
                _id:searchedUser._id,
                name:searchedUser.name,
            };
            const token = await jwt.sign(payload,process.env.SecretOrKey,{expiresIn:3600});
            res.status(200).send({user:searchedUser,msg:"success",token:`Bearer ${token}`});
        }catch(error){
            console.log(error)
            res.status(500).send({msg:"can not get the user"});
        }
    },
    
    current :(req,res)=>{
        res.status(200).send({user:req.user});
    }

}