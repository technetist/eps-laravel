const SERVER_PORT = 8000

var express = require('express');
var app = express();
var server = require('http').Server(app);

var io = require('socket.io').listen(server);
var redis = require('redis')
// var ioredis = require('socket.io-redis')

var sub = redis.createClient()

sub.on('error', function (error) {
    console.log('ERROR ' + error)
})

sub.on('subscribe', function (channel, count) {
    console.log('SUBSCRIBE', channel, count)
})

sub.on('connect', () => {
    console.log('Sup Homie');
    io.sockets.emit('here-is-your-id')
})


// Handle messages from channels we're subscribed to
sub.on('message', function (channel, payload) {
    console.log('INCOMING MESSAGE', channel, payload)

    payload = JSON.parse(payload)

    // Merge channel into payload
    payload.data._channel = channel

    // Send the data through to any client in the channel room (!)
    // (i.e. server room, usually being just the one user)
    io.sockets.in(channel).emit(payload.event, payload.data)
    io.sockets.emit('apple',{message: 'apples'});
})

/*
 * Server
 */

// Start listening for incoming client connections
io.sockets.on('connection', function (socket) {

    console.log('NEW CLIENT CONNECTED')

    socket.emit('connect', this.socket)

    socket.on('subscribe-to-channel', function (data) {
        console.log('SUBSCRIBE TO CHANNEL', data)

        // Subscribe to the Redis channel using our global subscriber
        sub.subscribe(data.channel)

        // Join the (somewhat local) server room for this channel. This
        // way we can later pass our channel events right through to
        // the room instead of broadcasting them to every client.
        socket.join(data.channel)
    })

    socket.on('whoworkin', function () {
        console.log('I dunno')
        socket.emit('theyworkin', {message: 'banana', number1: Math.floor((Math.random() * 2) + 0), number2: Math.floor((Math.random() * 2) + 0), number3: Math.floor((Math.random() * 2) + 0) })
        console.log(data.number1)
        console.log(data.number2)
        console.log(data.number3)
    })

    socket.on('ping', function() {
        console.log('Receive "ping"');
    })

    socket.on('disconnect', function () {
        console.log('DISCONNECT')
    })

})

// Start listening for client connections
server.listen(SERVER_PORT, function () {
    console.log('Listening to incoming client connections on port ' + SERVER_PORT)
})