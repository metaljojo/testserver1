var io = require('socket.io')(process.env.PORT || 4567); // 19:20 von 1. "wenn online anders"

console.log('Server has aaaaa started');

io.on('connection', function(socket){
    console.log('Connection Made!');

    socket.on('disconnect', function(){
        console.log('A player has disconnect');
    });
});