//Node Server which will handle socket io connections 
const io =require("socket.io")(8000);//port
 
const users={};
io.on("connection", socket =>{
    //Tif any new user joins , let other user connected to the server know!
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    //If someone sends a message,broadcast it to other people
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
    });

    
    //If someone left,broadcast it to other people
    socket.on('disconnect',message=>{
        socket.broadcast.emit('user-leave',users[socket.id]);
        delete users[socket.id];
    });
}) 
