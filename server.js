var io = require('socket.io')(process.env.PORT || 5000); // 19:20 von 1. "wenn online anders"

var Player = require('./classes/Player.js');

console.log('Covid X Server has started');


var players = [];
var sockets = [];

io.on('connection', function(socket){
    var player = new Player();
    var thisPlayerID = player.id;
    players[thisPlayerID] = player;
    sockets[thisPlayerID] = socket;

    //Tell the client that this is our id for the server
    socket.emit('register', {id: thisPlayerID});
    socket.emit('spawn', player); //Tell myself I have spawned
    socket.broadcast.emit('spawn', player); //Tell others I have spawned

    for(var playerID in players){
        if(playerID != thisPlayerID){
            socket.emit('spawn', players[playerID].id);
        }
    }

    socket.on('disconnect', function(){
        console.log( 'loged out: ', thisPlayerID);
        delete players[thisPlayerID];
        delete sockets[thisPlayerID];
    });
});