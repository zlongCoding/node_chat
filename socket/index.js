const server = require('../app')
const socketio = require("socket.io")
const io = socketio(server)

io.on('connection', (socket) => {
  const socketId = socket.id
  socket.on('sendMessage', (data) => {
    console.log(data)
  })
})