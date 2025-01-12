const express = require('express');
const { userAuth } = require('../middlewares/auth');
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const authRouter = require('./auth');
const user = require('../models/user');
const ITEMS_TO_POPULATE = "firstName lastName about skills photoUrl";
const User = require('../models/user');

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

userRouter.get("/feed", userAuth, async(req,res)=>{
  try { const loggedInUser = req.user;

    let limit = parseInt(req.query.limit)||10;
    const page = parseInt(req.query.page)||1;
    limit=limit>50 ? 50:limit;


    const skip =( page-1)*limit;

    const connectionRequest = await ConnectionRequest.find({
       $or: [ {fromUserId: loggedInUser._id},
        {toUserId:loggedInUser._id}]
    }).select("toUserId fromUserId");
    
    
    const hideUserFromFeed = new Set();
    connectionRequest.forEach((req)=>{
        hideUserFromFeed.add(req.fromUserId.toString());
        hideUserFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
        $and:[
          {_id:{$nin: Array.from(hideUserFromFeed)}},
          {_id:{$ne: loggedInUser._id} },
        ]
    }).select(ITEMS_TO_POPULATE)
      .skip(skip)
      .limit(limit);

    res.send(users)}


    catch(err){
        res.send("ERROR: "+ err.message);
    }

})

module.exports=userRouter;