const{check,validationResult} = require('express-validator');

exports.registerRules = () =>
    [
        check("name","name is required").notEmpty(),
        check("lastName","lastName is required").notEmpty(),
        check("email","email is required").notEmpty(),
        check("email","check email again").isEmail(),
        check("password","password is required").isLength({min:6,max:20}),
    ];


exports.loginRules = () =>
    [
        
        check("email","email is required").notEmpty(),
        check("email","check email again").isEmail(),
        check("password","password is required").isLength({min:6,max:20}),
    ];


exports.validation = (req,res,next)=>{
   const  errors = validationResult(req);
   if(!errors.isEmpty())return res.status(400).send({errors:errors.array().map((el)=>({msg:el.msg,}))});
   next();
};