const express = require('express');
const { userAuth } = require('../middlewares/auth');
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const authRouter = require('./auth');
const ITEMS_TO_POPULATE = "firstName lastName about skills photoUrl";

userRouter.get("/user/requests/received", userAuth, async(req,res)=>{
  try{  
    const loggedInUser = req.user;
    const connectionRequest= await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status:"interested"
    }).populate("toUserId", ITEMS_TO_POPULATE);

    res.json({
        message:"These are the requests received",
        data: connectionRequest
    });}
    catch(err){
        res.send("ERROR: "+ err.message)
    }
})

userRouter.get("/user/connection", userAuth, async(req,res)=>{
    try{
        const loggedInUser= req.user;
        const connectionRequest= await ConnectionRequest.find({
            $or:[
                {fromUserId : loggedInUser._id, status:"accepted"},
                {toUserId : loggedInUser._id,   status:"accepted"}
            ]
        })
        .populate("fromUserId", ITEMS_TO_POPULATE)
        .populate("toUserId", ITEMS_TO_POPULATE);

        const data = connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString()==loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });
    
        res.send(data);

    }
    catch(err){
        res.send("ERROR: "+ err.message);
    }
})

module.exports=userRouter;