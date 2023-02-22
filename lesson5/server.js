var express = require("express")
var app = express();
var server = require("http").createServer(app)
var io = require("socket.io")(server)

app.use(express.static('.'))

var messages = []
io.on('connection', (socket)=>{
    for(var i in messages){
        socket.emit('display message', message[i])
    }
    socket.on('send message',(msg)=>{
        messages.push(msg)
        io.sockets.emit('display message', msg)
    })
})




app.get("/", (res,req)=>{
    res.redirect('index.html')
})
server.listen(3000)
