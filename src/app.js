const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const cookieParser=require("cookie-parser");
const {validateSignUpData} = require("./utils/validation");
const JWT = require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth");
const user = require('./models/user');

const authRouter=require('./routes/auth');
const profileRouter=require("./routes/profile");
const requestRouter = require("./routes/request");



app.use(cookieParser());
app.use(express.json());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


// Creating Signup Api
// app.post("/signup", async (req,res)=>{

   
//     const {firstName, lastName, emailId, password}= req.body;

//      // Encrypt the password 
//      const passwordHash = await bcrypt.hash(password,10);

//      // Create instance of the User model
//     const user= new User({
//         firstName,
//         lastName,
//         emailId,
//         password: passwordHash
//     });
//     try{

//     // Validate the data
//     validateSignUpData(req);


//     await user.save();
//     res.send("User Added Sucessfully");
//       }
      
//     catch(err){
//         res.status(400).send("ERROR:"+err.message);
//     }
// })

// app.get("/profile", userAuth, async(req,res)=>{
//     try{
//        const user =req.user;
//        res.send(user);
//     }
//     catch(err){
//         res.status(400).send("ERROR:"+err.message);
//     }
// })

// Creating Login API
// app.post("/login",async (req,res)=>{
//     try{
//         const {password, emailId, userId}=req.body;

//         const user= await User.findOne({emailId:emailId});
//         if(!user){
//             throw new Error("Invalid credentials");
//         }
//         const isValidPassword= await user.validatePassword(password);
//         if (!isValidPassword){
//             throw new Error("Invalid credentials");
//         }

//         // Create a JWT Token
//         const token = await user.getJWT();



//         // Add token to cookie and send response back to user
//         res.cookie("token",token, {
//             expires: new Date(Date.now()+ 8*3600000)
//         });
        

//         res.send("Login Successful")
//     }
//     catch(err){
//         res.status(400).send("ERROR:"+err.message);
//     }
    
// })

// app.post("/sendConnectionRequest", userAuth, async(req,res)=>{
//     const user = req.user;
//     res.send(user.firstName+" Sent you a connection request");
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










