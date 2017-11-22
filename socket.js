var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var redis = new Redis();
redis.subscribe('test-channel', function(err, count) {
});
redis.on('message', function(channel, message) {
    console.log('Message Received: ' + message);
    message = JSON.parse(message);
    io.emit(channel + ':' + message.event, message.data);
});
redis.on('connection', function(client) {
    console.log('Connected');
    io.emit("Client Connected");
});
http.listen(3000, function(){
    console.log('Listening on Port 3000');
});