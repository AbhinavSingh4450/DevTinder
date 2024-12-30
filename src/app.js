const express = require('express');
const app = express();

app.use(
    "/user",
     (req,res,next)=>{
    console.log("I am 1 Route Handler");
    // res.send("Response 1");
    next();
    },
  [  (req,res,next)=>{
        console.log("I am 2 Route Handler");
        // res.send("Response 2");
        next();
    } ,
    (req,res, next)=>{
        console.log("I am 3 Route Handler");
        // res.send("Response 3");
        next();
    } ],
    (req,res,next)=>{
        console.log("I am 4 Route Handler");
        res.send("Response 4");

    }  
)

app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000...");
});

