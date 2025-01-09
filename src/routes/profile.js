const express= require('express');
const profileRouter = express.Router();
const {userAuth}=require("../middlewares/auth");
const {validateEditProfileData}=require('../utils/validation');


profileRouter.get("/profile/view", userAuth, async(req,res)=>{
    try{
       const user =req.user;
       res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR:"+err.message);
    }
})

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    try{
    validateEditProfileData(req);
    const loggedInUser=req.user;
    const userInputForUpdate = req.body;
    
    Object.keys(userInputForUpdate).every((key)=>{
        loggedInUser[key]=userInputForUpdate[key];
    } )


    await loggedInUser.save();
    res.json({
        message:`${loggedInUser.firstName}, your profile edit successfully!`,
        data: loggedInUser
    });
  }
    catch(err){
        res.status(400).send("Error:"+err.message);
    }

} )

module.exports=profileRouter;
