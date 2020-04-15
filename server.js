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
    
    socket.on('tellUN', function(user){ 
        player.username =  user.username 
        console.log('loged in: ',  player.username);      
        socket.emit('register', {username: player.username});
        socket.emit('spawn', player);
        socket.broadcast.emit('spawn', player);
    });

    for(var playerID in players){
        if(playerID != thisPlayerID){
            socket.emit('spawn', players[playerID].username);
        }
    }

    socket.on('disconnect', function(){
        console.log( 'loged out: ', players[thisPlayerID].username);
        delete players[thisPlayerID];
        delete sockets[thisPlayerID];
    });
});