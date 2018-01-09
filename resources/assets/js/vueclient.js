const PRIVATE_CHANNEL = 'ppc-game-communication-broadcast'
var io = require('socket.io-client')
var socket = io.connect('http://'+ app_ip +':8000');

socket.on('connect', function () {
    console.log('CONNECT')
    document.getElementById("start").addEventListener("click", function () {
        this.setAttribute("disabled", true)
        $('#Modal1').modal('show');
        console.log("clicking!")
    })

    document.getElementById("modal1_savechanges").addEventListener("click", function () {
        $('#Modal1').modal('hide');
        socket.emit("start")
        console.log("save changes clicked!")
    })

    document.getElementById("modal1_close").addEventListener("click", function () {
        $('#Modal1').modal('hide');
        document.getElementById("start").removeAttribute("disabled");
        console.log("close clicked!")
    })

    document.getElementById("stop").addEventListener("click", function () {
        document.getElementById("start").removeAttribute("disabled");
        socket.emit("stop")
        console.log("reset clicked!")
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
        document.getElementById("counter").innerHTML = minutes2 + ':' + seconds2;
    });

    socket.on('set', function(data) {
        console.log("it's set!");
        //how to trigger a modal
        $('#Modal2').modal('show');
        //how to use the ok and cancel button
        document.getElementById("modal2_ok").addEventListener("click", function (){
            $('#Modal2').modal('hide');
            socket.emit('ready');
        })

        document.getElementById("modal2_cancel").addEventListener("click", function (){
            $('#Modal2').modal('hide');
            socket.emit('stop');
            document.getElementById("start").removeAttribute("disabled");
        })

    });

    socket.emit('subscribe-to-channel', {channel: PRIVATE_CHANNEL})
    console.log('SUBSCRIBED TO <' + PRIVATE_CHANNEL + '>');

})
