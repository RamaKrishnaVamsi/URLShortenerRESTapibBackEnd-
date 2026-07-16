const User =  require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async (req , res) =>{
    try{
        const {userName,id,name,email,password} = req.body;
        let user = await User.findOne({ email });
        
        if(user){
          return res.status(400).json({message:"User already exists"});
        }

        const Hpassword = await bcrypt.hash(password , 10);
        user = new User({ id , name , email , password : Hpassword});
        await user.save();  
        
        res.status(201).json({
        success: true,
        message: "User Registered Successfully"
        });
    }catch(err){
        console.log("Server Dengindi:-1")
        console.log(err.message);
        res.status(500).json({message : err.message || "server error"})
    }
}
exports.login = async (req , res)=>{
    try{
        const {email , password} = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ 
                message : "Invalid credentials"
            });
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({
                message : "Invalid Credentials"
            })
        }

        const token = jwt.sign(
            {
                id : user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn : "1d"
            }
        );

        res.status(200).json({
            success :true ,
            token,
            user : {
                id : user._id,
                name : user.name,
                email : user.email
            }
        })
    }catch(err){
        console.log(err.message);
        console.log("Server Dengindi 2");
        res.status(500).json({message : err.message || "server error"})
    }
}

exports.getUser = async (req , res) =>{
    try{
        const user= await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).json('Server Error')
    }
}