const mongoose = require('mongoose');

const connectionRequestSchema = new  mongoose.Schema({
    toUserId:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:"User"

    },
    fromUserId:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type: String,
        enum: { values:["interested","ignore", "accepted", "rejected"],
                message: `{VALUE} is incorrect status type`
              }
    }
},{timestamps:true});

connectionRequestSchema.index({firstName:1, lastName:1});

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
       throw new Error("Cannot send request to yourself");
    }
    next();
})

module.exports = mongoose.model("connectionRequest", connectionRequestSchema);

