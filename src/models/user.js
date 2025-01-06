const mongoose = require('mongoose');
const validator=require('validator');
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
        min:18
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
        }
    }

}, {timestamps:true});

module.exports= mongoose.model("User", userSchema);