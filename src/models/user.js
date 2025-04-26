const { JsonWebTokenError } = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator=require('validator');
const JWT=require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:15
    },
    lastName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:15
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address"+value);
            }
        }
    },
    password:{
        type:String,
        validate(value){
            if(!validator.isStrongPassword(value))
            {
                throw new Error("Choose a strong Password");
            }
        }
    },
    age:{
        type: Number,
        min:18,

    },
    photoUrl:{
        type:String,
        default:"https://media.istockphoto.com/id/1300502656/vector/man-standing-and-waiting-front-view-vector-silhouette.jpg?s=612x612&w=0&k=20&c=CgYSk7Itlceu2becqfMs_HBC57YFlsjvGtpVRG7l5o4="
    },
    skills:{
        type:[String],    
            
    },
    about:{
        type:String,
        default:"This is default about of the User"
    }, 
    gender:{
        type:String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Not a valid Gender");
            }
        },
        
    }

}, {timestamps:true});

userSchema.methods.getJWT= async function(){
    const user=this;
    const token = await JWT.sign({_id: user._id},"Kohli@userID", 
        {expiresIn:'1d'}
    );
    return token;
}
userSchema.methods.validatePassword= async function(passwordInputByUser){
    const user=this;
    const passwordHash = user.password;
    const isValidPassword= await bcrypt.compare(passwordInputByUser,passwordHash);
    return isValidPassword;
}

module.exports= mongoose.model("User", userSchema);