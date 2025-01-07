const { model } = require('mongoose');
const validator = require('validator');

const validateSignUpData = (req) => {
 const {firstName, lastName, emailId, password} = req.body;
 
 if(!firstName || !lastName){
    throw new Error("Enter the Name of the User");
 }
 else if (!validator.isEmail(emailId)){
    throw new Error("Enter the valid emailId");
 }
 else if (!validator.isStrongPassword(password)){
    throw new Error("Enter the strong password");
 }

}
module.exports={
   validateSignUpData,
}
