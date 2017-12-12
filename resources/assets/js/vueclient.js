const PRIVATE_CHANNEL = 'ppc-game-communication-broadcast'
var io = require('socket.io-client')
var socket = io.connect('http://'+ app_ip +':8000');


socket.on('connect', function () {
    console.log('CONNECT')

    document.getElementById("start").addEventListener("click", function () {
        socket.emit("start")
        console.log("start clicked!")
    })

    document.getElementById("reset").addEventListener("click", function () {
        socket.emit("reset")
        console.log("reset clicked!")
    })

    socket.on('messages.getStatus', function (data) {
        console.log(data.status)
    })

    socket.on('disconnect', function () {
        console.log('disconnect')
    })

    socket.on('timer', function(data) {
        document.getElementById("counter").innerHTML = data.time;
    });

    socket.emit('subscribe-to-channel', {channel: PRIVATE_CHANNEL})
    console.log('SUBSCRIBED TO <' + PRIVATE_CHANNEL + '>');
})