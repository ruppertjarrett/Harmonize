var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
    });

    http.listen(3000, function() {
        console.log('listening on *:3000');
    });
});