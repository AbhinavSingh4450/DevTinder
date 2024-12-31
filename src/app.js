const express = require('express');
const app = express();
const {adminAuth, userAuth}=require('./middlewares/auth.js');

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went Wrong");
    }
});

app.use("/admin",adminAuth);

app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data Sent");
});

app.get("/admin/deleteUser",(req,res)=>{
    res.send("User Deleted Successfully");
});


app.get("/user/getAllData",userAuth,(req,res)=>{
    res.send("All Data Sent");
});

app.get("/user/deleteUser",userAuth, (req,res)=>{
    res.send("User Deleted Successfully");
});




app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000...");
});

