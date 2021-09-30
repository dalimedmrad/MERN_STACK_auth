const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        let res = await mongoose.connect(process.env.DB,{useUnifiedTopology:true,useNewUrlParser:true});
        console.log("database is connected")

    }catch(error){
        console.log("database is not connected")
    };
    
}
module.exports = connectDB;