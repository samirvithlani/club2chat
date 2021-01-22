const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const server = http.createServer(app)
const socketio = require('socket.io')
const publicdir = path.join(__dirname, '../public')
const { Socket } = require('dgram')
app.use(express.static(publicdir))
const io = socketio(server);

let count = 0
let msg = ''

io.on('connection', (socket) => {

    console.log("new Socket Connection started..")

    socket.emit('message', 'Welcome!!')
    socket.broadcast.emit('message', 'new user joined')

    socket.on('sendMessage', (message) => {

        console.log('called.........')
        io.emit('message', message)
    })
    socket.on('disconnect', () => {
        io.emit('message', "user left")
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