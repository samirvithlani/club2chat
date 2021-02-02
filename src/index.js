const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const server = http.createServer(app)
const socketio = require('socket.io')
const {generateMessage} = require('./util/messages')
const publicdir = path.join(__dirname, '../public')
const { Socket } = require('dgram')
app.use(express.static(publicdir))
const io = socketio(server);

let count = 0
let msg = ''

io.on('connection', (socket) => {

    console.log("new Socket Connection started..")

    socket.on('join',({username,room})=>{

        
        socket.join(room)
        socket.emit('message', generateMessage('Welcome!!'))
        socket.emit('message',generateMessage(`${username}has joined..`))

    })

    
    //socket.broadcast.emit('message', generateMessage('new user joined'))

    socket.on('sendMessage', (message,callback) => {

        
        io.emit('message', generateMessage(message))
        callback()
    })
    socket.on('disconnect', () => {
        io.emit('message', generateMessage("user left"))
    })

    socket.on('sendLocation', (cord) => {

        io.emit('message', `https://google.com/maps?q=${cord.latitude},${cord.longitude}`)
    })

    /*  socket.emit('countUpdated', count)
     socket.on('increment', () => {
 
         count++;
         io.emit('countUpdated', count)
         //socket.emit('countUpdated', count)
         
     }) */
})


server.listen(3000, () => {
    console.log("server started..")
})