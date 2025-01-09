const express = require("express");
const authRouter = express.Router();


const User = require("../models/user");
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require('bcrypt');


// Creating Signup API
authRouter.post("/signup", async (req,res)=>{

   
    const {firstName, lastName, emailId, password}= req.body;

     // Encrypt the password 
     const passwordHash = await bcrypt.hash(password,10);

     // Create instance of the User model
    const user= new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash
    });
    try{

    // Validate the data
    validateSignUpData(req);


    await user.save();
    res.send("User Added Sucessfully");
      }
      
    catch(err){
        res.status(400).send("ERROR:"+err.message);
    }
})

// Creating Login API
authRouter.post("/login",async (req,res)=>{
    try{
        const {password, emailId, userId}=req.body;

        const user= await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isValidPassword= await user.validatePassword(password);
        if (!isValidPassword){
            throw new Error("Invalid credentials");
        }

        // Create a JWT Token
        const token = await user.getJWT();



        // Add token to cookie and send response back to user
        res.cookie("token",token, {
            expires: new Date(Date.now()+ 8*3600000)
        });
        

        res.send("Login Successful")
    }
    catch(err){
        res.status(400).send("ERROR:"+err.message);
    }
    
})

// Creating Logout API
authRouter.post("/logout", async(req, res)=>{
    await res.cookie("token", null, 
        {expires: new Date(Date.now())}
    )  
    await res.send("User Logout Successfully");
})

module.exports=authRouter;