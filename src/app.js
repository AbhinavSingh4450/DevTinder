const express = require('express');
const app = express();

app.use("/test", (req, res)=>{
    res.send("Hello from the test");

});

app.use("/namaste", (req, res)=>{
    res.send("Namaste from the server");

});


app.use((req, res)=>{
    res.send("Hello from the main deshboard of server");

});

app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000...");
});