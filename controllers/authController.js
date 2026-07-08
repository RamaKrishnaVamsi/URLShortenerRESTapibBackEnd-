const User =  require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async (req , res) =>{
    try{
        const {User,id,name,email,password} = req.body;
        let user = await User.findOne({email});

        if(user){
          return res.status(400).json({message:"User already exists"});
        }

        const Hpassword = await bcrypt.hash(password , 10);
        user = new User({ id , name , email , password:Hpassword });
        await user.save();  
        
        res.status(201).json({
        success: true,
        message: "User Registered Successfully"
        });
    }catch(err){
        console.log("Server Dengindi")
        console.log(err.message);
        res.status(500).json({message : err.message || "server error"})
    }
}
exports.login = async (req , res)=>{
    try{
        const {email , password} = req.body;
        const user = await User.findOne( {email} );
        if(!user){
            res.status(400).json({ message : "Invalid credentials"});
        }
        
    }catch(err){
        console.log(err.message);
        console.log("Server Dengindi");
        res.status(500).json({message : err.message || "server error"})
    }
}