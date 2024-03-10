const express = require('express');
const app = express();
const path = require("path");
const port = 4000;


const http = require("http").Server(app);
//attach http server to socket.io
const io = require("socket.io")(http)


app.get("/", (req,res) => {
   res.sendFile(path.join(__dirname,'src/index.html'))
}) 

io.on("connection", (socket) => {
    console.log("A user connected")
    socket.on("disconnect", () =>{
        console.log("A user disconnected")
    })
    socket.on("message", msg =>
    {
        console.log("Client message: " + msg)
    })
    socket.emit("server", "Recieve From Server")
})

http.listen(port, () => {
    console.log(`Listening on port ${port}`)
})