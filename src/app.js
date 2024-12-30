const express = require('express');
const app = express();

app.use("/user/:userId/:name",(req,res)=>{
    console.log(req.params);
    res.send(req.params);
})

app.get("/ab+c", (req,res)=>{
    res.send("hahahhah");
})

app.get("/de?f", (req,res)=>{
    res.send("hehehe");
})

app.get("/test",(req,res)=>{
 
    res.send({
        "name": "Abhinav Singh",
        "city":"Agra"
    })
});

app.post("/test",(req,res)=>{
    res.send("This is post from the test");
});

app.delete("/test",(req,res)=>{
    res.send("This is delete from the test");
});

// app.use("/test", (req, res)=>{
//     res.send("Hello from the test");

// });

// app.use("/namaste", (req, res)=>{
//     res.send("Namaste from the server");

// });

// app.use("/", (req, res)=>{
//     res.send("The most basic call!!");
// });


// app.use((req, res)=>{
//     res.send("Hello from the main deshboard of server");

// });

app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000...");
});

