const SERVER_PORT = 8000

var express = require('express');
var app = express();
var server = require('http').Server(app);

var io = require('socket.io').listen(server);
var redis = require('redis')
// var ioredis = require('socket.io-redis')

var sub = redis.createClient()

var timerStart = null;
var index = 0;

var timer = 0;

var activeMachines = []

function randomized(top, bottom) {
    return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
}

sub.on('error', function (error) {
    console.log('ERROR ' + error)
})

sub.on('subscribe', function (channel, count) {
    console.log('SUBSCRIBE', channel, count)
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

        socket.on('checkin', function (data) {
            activeMachines.push(data.name)
            console.log(activeMachines)
            console.log(activeMachines.length)
        })
    })

    socket.on('start', function () {

        // index = 0;

            console.log("timer start... :(");
            timerStart = 0;
            timer = setInterval(function () {
                timerStart++;
                io.sockets.emit('timer', {time: timerStart});
                /*

                    if(timerStart === ol[index].time)
                        io.sockets.emit('produce',{
                                machine:ol[index].machine,
                                product:ol[index].product,
                                amount:ol[index].amount});
                        index++
                        }
                */

            }, 1000);

    })

    socket.on('reset', function () {
        timerStart = 0;
        //index = 0
        clearInterval(timer)
        io.sockets.emit('timer', { time: timerStart });
    });


    socket.on('whoworkin', function () {
        socket.emit('theyworkin', {message: 'banana', number1: randomized(2,0), number2: randomized(2,0), number3: randomized(2,0), number4: randomized(2,0), number5: randomized(2,0)})
    })

    socket.on('disconnect', function () {
        console.log('DISCONNECT')
    })

})

// Start listening for client connections
server.listen(SERVER_PORT, function () {
    console.log('Listening to incoming client connections on port ' + SERVER_PORT)
})