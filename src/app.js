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
const userRouter = require("./routes/user");



app.use(cookieParser());
app.use(express.json());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);




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










