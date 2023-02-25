var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var messages = [];

app.use(express.static("."));



app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);

let Grass = require("./grass")
let GrassEater = require("./grassEater")
let Predator = require("./predator")
let Hunter = require("./hunter")
let Trap = require("./trap")




function generate(matLen,gr,grEat,pr,h,trap) {
    let matrix = []
    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        console.log(x,y);
        if(matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        console.log(x,y);
        if(matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < h; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        console.log(x,y);
        if(matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    for (let i = 0; i < trap; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        console.log(x,y);
        if(matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    io.emit("send matrix",matrix)
    return matrix
}

 matrix = generate(45,200,45,45,45,0)

 grassArr = []
 grassEaterArr = []
 predatorArr = []
 hunterArr = []
 trapArr = []

function createObj(){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            }else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                predatorArr.push(gr)
            }
            else if (matrix[y][x] == 4) {
                let gr = new Hunter(x, y)
                hunterArr.push(gr)
            }
            else if (matrix[y][x] == 5) {
                let gr = new Trap(x, y)
                trapArr.push(gr)
            }
        }
    }
    io.emit("send matrix",matrix)
}

createObj()
function gameMove(){
    for(var i in grassArr){
        grassArr[i].mul()
     }
   
     for(let i in grassEaterArr) {
         grassEaterArr[i].eat()
     }
     for(let i in predatorArr) {
        predatorArr[i].eat()
    }
    for(let i in hunterArr) {
        hunterArr[i].kill()
    }
    for(let i in trapArr) {
        trapArr[i].eat()
    }
    io.emit("send matrix",matrix)
    
}
setInterval(gameMove, 300);
