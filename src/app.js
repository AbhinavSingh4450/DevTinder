const express = require('express');
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

// app.post("/signup", async (req,res)=>{
//     const user = new User ({
//         firstName:"Abhinav",
//         lastName: "Singh",
//         emailId: "abhinav@.com",
//         password: "abhi9",
//         age: 35
//     });
//     await user.save();
//     res.send("user added sucessfully");
// });

app.use(express.json());

app.post("/signup", async (req,res)=>{
    const userData = req.body;
    const user= new User(userData);
    try{
        await user.save();
        res.send("User Added Sucessfully");
      }
    catch(err){
        res.status(400).send("Some went Wrong");
    }
})

// For getting user by emailID 
// app.get("/feed",async (req,res)=>{
//      const emailId = req.body.emailId;

//      try{
//         const feedUser= await User.find({
//             emailId:emailId
//          });
//          console.log("user add hogya hai");
//          res.send(feedUser);
//      }
//      catch(err){
//         res.status(404).send("User Not Found");
//      }
    
     
// })


// Getting all the users to create a feed
app.get("/feed",async (req,res)=>{

    try{
       const users= await User.find({});
       if(users.length==0){
        res.status(404).send("No user found");
       }
       else{
        console.log("user add hogya hai");
        res.send(users);
       }
    
    }
    catch(err){
       res.status(400).send("Something went Wrong");
    } 
})

app.delete("/user", async(req,res)=>{
    const id= req.body.id;
    await User.findByIdAndDelete({_id: id})
    res.send("User deleted successfully");
})

app.patch("/user", async(req,res)=>{
    const userId=req.body.userId;
    const data = req.body;
    try{
       const ALLOWED_UPDATES=["userId","firstName","lastName","skills","about","gender"] ;
       const isUpdateAllowed= Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
       if(!isUpdateAllowed){
        throw new Error("Update not allowed");
       }

       const user = await User.findByIdAndUpdate({_id : userId},data,{
        runValidators:true
       } );
        console.log(user);
        res.send("User updated Successfully");
    }
    catch(err){
        res.status(400).send("Something went Wrong");
    }
   

})

connectDB()
.then(()=>{
    console.log("Database connection established...");
    app.listen(3000, ()=>{
        console.log("Server is successfully listening on port 3000...");
    });

})
.catch(()=>{
    console.log("Database cannot be connected");
})








