var io = require('socket.io')(process.env.PORT || 5000); // 19:20 von 1. "wenn online anders"

var Player = require('./classes/Player.js');

console.log('Server has aaaaa started');


var players = [];
var sockets = [];

io.on('connection', function(socket){
    console.log('Connection Made!');

    var player = new Player();
    var thisPlayerID = player.id;

    players[thisPlayerID] = player;
    sockets[thisPlayerID] = socket;


    // socket.emit('p1', 'lalalalalalala');
    // socket.emit('p2', 'bbbbb');
    socket.emit('register', {id: thisPlayerID});
    socket.emit('spawn', player);
    socket.broadcast.emit('spawn', player);

    for(var playerID in players){
        if(playerID != thisPlayerID){
            socket.emit('spawn', players[playerID]);
        }
    }


    socket.on('disconnect', function(){
        console.log('A player has disconnect');
        delete players[thisPlayerID];
        delete sockets[thisPlayerID];
    });
});