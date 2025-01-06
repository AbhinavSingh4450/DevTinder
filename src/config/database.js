const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://sabhinavpratap2:C25COd0zNxvjsfLr@cluster1.4h5td.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster1");
}

module.exports = connectDB;



