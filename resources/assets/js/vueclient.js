const PRIVATE_CHANNEL = 'ppc-game-communication-broadcast'
var io = require('socket.io-client')
var socket = io.connect('http://'+ app_ip +':8000');

socket.on('connect', function () {
    console.log('CONNECT')

    document.getElementById("start").addEventListener("click", function () {
        this.setAttribute("disabled", true)
        socket.emit("start")
        console.log("clicking!")
    })

    document.getElementById("reset").addEventListener("click", function () {
        document.getElementById("start").removeAttribute("disabled");
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
        console.log('started timer');
        let minutes = Math.floor(data.time / 60);
        let seconds = data.time - minutes * 60;
        let minutes2 = (minutes < 10 ? '0' : '') + minutes;
        let seconds2 = (seconds < 10 ? '0' : '') + seconds;
        document.getElementById("counter").innerHTML = minutes2+':'+seconds2;
    });

    socket.emit('subscribe-to-channel', {channel: PRIVATE_CHANNEL})
    console.log('SUBSCRIBED TO <' + PRIVATE_CHANNEL + '>');
})
