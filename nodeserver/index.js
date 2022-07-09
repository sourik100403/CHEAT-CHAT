const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
const users={};

io.on('connection',socket => {
  //if any new user join ,let othe user connected to the server know!
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    //if someone sends a message,brodcast other!!
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    //if someone left the chat, let others know
    socket.on('disconnect', message =>{
      socket.broadcast.emit('left', users[socket.id]);
      delete users[socket.id];
  });
})