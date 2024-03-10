const express = require("express")
const app = express();
const port = 3000;
const http = require("http").Server(app)
const io = require("socket.io")(http)
const path = require("path")

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,'src/index.html'))
})


io.on("connection", (socket) => {
    console.log("User connected")
    socket.on("disconnect", () => {
        console.log("User disconnected")
    })
    socket.on("message", msg => {
        console.log("Message " + msg)
    })
    socket.emit("server", "recieve from server")
}

)




http.listen(port, ()=>{
    console.log("App is listening on port: " + port)
})