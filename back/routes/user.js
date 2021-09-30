const express = require("express");
const router = express.Router();
const controllers = require('../controllers/user');
const {loginRules,registerRules,validation} = require('../middleware/validator');
const isAuth = require('../middleware/passport');


//test
// router.get("/",(req,res)=>{
//     res.send("hheloo");
// });


// register
router.post("/register", registerRules(),validation,controllers.register);

// login 
router.post("/login", loginRules(),validation,controllers.login);

// current
router.get("/current",isAuth(),controllers.current);

module.exports = router;