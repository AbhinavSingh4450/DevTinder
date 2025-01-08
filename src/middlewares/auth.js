const jwt = require('jsonwebtoken');
const User = require("../models/user");

const adminAuth= (req,res,next)=>{
    const token ="xyz";
    const isAdminAuthorised= (token==="xyz");
    if(!isAdminAuthorised){
        res.status(401).send("Unauthorised Request");
    }
    else{
        console.log("admin Auth");
        next();
    }}

const userAuth= async (req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            throw new Error("Invalid Token");
        }
        const decodedMessage= jwt.verify(token,"Kohli@userID");
        
        const {_id}=decodedMessage;
        const user= await User.findById(_id);
        if(!user){
            throw new Error("User not Found");
        }
        req.user=user;
        next();  
    }
    catch(err){
        res.status(400).send("ERROR:"+err.message);
    }


}

module.exports={
    adminAuth, userAuth
}