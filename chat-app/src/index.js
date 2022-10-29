//------------------------------------
const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
//------------------------------------
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public")
app.use(express.static(publicDirectoryPath));
//------------------------------------

// let count = 0

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage', (msg, callback) => {
        const filter = new Filter()
        if (filter.isProfane(msg)) return callback('Error: Profanity is not allowed!')

        io.emit('sendMessage', msg)
        callback()
    })

    socket.on('sendLocation', ({lat, long}, callback) => {
        io.emit('message', `https://google.com/maps?q=${lat},${long}`)
        callback()
    })

    socket.on('disconnect', () => {
        /* socket has already left, so will receive nothing */ // socket.broadcast.emit('message', 'An user has left!')
        io.emit('message', 'An user has left!')
    })
})

server.listen(port, () => {
    console.log('Server is up on port ' + port)
})

