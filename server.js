var express = require('express');
var path = require('path');
var app = express();
var intellisense = require('intellisense-js');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 8080;
var users = [];

app.use(express.static(path.join(__dirname, "public")));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


io.on('connection', function(socket) {

    socket.on('user-typing', function(data) {
        console.log(data);
        socket.broadcast.emit('user-typed', data);
    });

});

server.listen(port, function() {
    console.log("Listening on port " + port);
});