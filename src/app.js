const express = require('express');
const bcrypt = require('bcrypt')
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const cookieParser=require("cookie-parser");
const {validateSignUpData} = require("./utils/validation");
const JWT = require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth");
const user = require('./models/user');


app.use(cookieParser());
app.use(express.json());

// Creating Signup Api
app.post("/signup", async (req,res)=>{

   
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

app.get("/profile", userAuth, async(req,res)=>{
    try{
       const user =req.user;
       res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR:"+err.message);
    }
})

// Creating Login API
app.post("/login",async (req,res)=>{
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

app.post("/sendConnectionRequest", userAuth, async(req,res)=>{
    const user = req.user;
    res.send(user.firstName+" Sent you a connection request");
})

// Getting all the users to create a feed
// app.get("/feed",async (req,res)=>{

//     try{
//        const users= await User.find({});
//        if(users.length==0){
//         res.status(404).send("No user found");
//        }
//        else{
//         console.log("user add hogya hai");
//         res.send(users);
//        }
    
//     }
//     catch(err){
//        res.status(400).send("Something went Wrong");
//     } 
// })

// app.delete("/user", async(req,res)=>{
//     const id= req.body.id;
//     await User.findByIdAndDelete({_id: id})
//     res.send("User deleted successfully");
// })

// app.patch("/user", async(req,res)=>{
//     const userId=req.body.userId;
//     const data = req.body;
//     try{
//        const ALLOWED_UPDATES=["userId","firstName","lastName","skills","about","gender"] ;
//        const isUpdateAllowed= Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
//        if(!isUpdateAllowed){
//         throw new Error("Update not allowed");
//        }

//        const user = await User.findByIdAndUpdate({_id : userId},data,{
//         runValidators:true
//        } );
//         console.log(user);
//         res.send("User updated Successfully");
//     }
//     catch(err){
//         res.status(400).send("Something went Wrong");
//     }
   

// })

connectDB()
.then(()=>{
    console.log("Database connection established...");
    app.listen(3000, ()=>{
        console.log("Server is successfully listening on port 3000...");
    });

})
.catch(()=>{
    console.log("Database cannot be connected");
})










