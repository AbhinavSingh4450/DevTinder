const express = require('express');
const requestRouter = express.Router();
const {userAuth}=require("../middlewares/auth");
const ConnectionRequest = require('../models/connectionRequest');
const User = require("../models/user");

requestRouter.use("/request/send/:status/:userID",userAuth, async(req,res)=>{
    try{
    const fromUserId = req.user._id;
    const toUserId = req.params.userID;
    const status = req.params.status;

    const allowedStatusType =["ignore", "interested"];
    if(!allowedStatusType.includes(status)){
      return  res.json({
        message : `${status} is invalid status type`,
        })
    }

    // Checking whether the connection request already exists or not
    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or:[
            {fromUserId, toUserId},
            {
             fromUserId:toUserId, toUserId:fromUserId
            }
        ]

    })
    if(existingConnectionRequest){
        return res.status(400).send("message: Connection request already exists");
    }

    const toUserIdExist= await User.findById(toUserId);
    if(!toUserIdExist){
        return res.status(400).send("message: User does not exist in DB");
    }

    // if(toUserId==fromUserId){
    //     return res.status(400).json({message:"Cannot send request to yourself"});
    // }
 





    const connectionRequest = new ConnectionRequest({
        status:status,
        fromUserId: fromUserId,
        toUserId: toUserId
    })

    await connectionRequest.save();
    res.json({
        "message": `${req.user.firstName} is ${status} in you } `,
        "body": connectionRequest
    });
}
    catch(err){
        res.send("ERROR: "+ err.message);
    }
})

// requestRouter.post("/sendConnectionRequest", userAuth, async(req,res)=>{
//     const user = req.user;
//     res.send(user.firstName+" Sent you a connection request");
// })

module.exports = requestRouter;