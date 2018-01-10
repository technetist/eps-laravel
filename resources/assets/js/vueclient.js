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

    socket.on('ready', function (data) {
        document.getElementById('A0').innerHTML = "A0: " + data.A0;
        document.getElementById('B0').innerHTML = "B0: " + data.B0;
        document.getElementById('C0').innerHTML = "C0: " + data.C0;
        document.getElementById('D0').innerHTML = "D0: " + data.D0;
        document.getElementById('D1').innerHTML = "D1: " + data.D1;
        document.getElementById('E0').innerHTML = "E0: " + data.E0;
        document.getElementById('E1').innerHTML = "E1: " + data.E1;
        document.getElementById('E2').innerHTML = "E2: " + data.E2;
        $('#Modal1').modal('show');
        document.getElementById("modal1_savechanges").disabled = true;
        setTimeout(function(){document.getElementById("modal1_savechanges").disabled = false;},2000);
    })

    document.getElementById("modal1_savechanges").addEventListener("click", function () {
        $('#Modal1').modal('hide');
        socket.emit("preproCalcFin")
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
            socket.emit('go');
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
