require("dotenv").config();
require('dns').setServers(["8.8.8.8",'8.8.8.4'])
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");




const app = express();
const server = http.createServer(app)

app.use(cors()); 
app.use(express.json());

app.use("/api/auth",require("./routes/auth")); 
app.use("/api/message",require("./routes/Messages"))

//socket.io logic

const userSocketMap = {};

io.on("connection",(socket)=>{
    console.log("User Connected",socket.id);
    socket.on("User Online",(username)=>{
        userSocketMap[username]= socket.id;
    })
})


mongoose.connect(process.env.MONGO_URI).then(()=>server.listen(5000,
    ()=>console.log("Server is running on port 5000")
)).catch((err)=>
    console.error(err)
)
