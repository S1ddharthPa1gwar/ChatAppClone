//Node Server which will handle socket io connections
const io = require('socket.io')(8000)

const users = {};

io.on('connection',socket =>{
    //if any new user joinjs, let other users know
    socket.on('new-user-joined', name => {
        console.log("New user",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
   
    //if someone sends message, broadcast to all
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message : message,name : users[socket.id]})
    });

    //if someone leave, broadcast to all
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
});
