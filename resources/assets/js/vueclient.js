const PRIVATE_CHANNEL = 'ppc-game-communication-broadcast'
var io = require('socket.io-client')
var Vue = require('vue');
var socket = io.connect('http://'+ app_ip +':8000');
var global_line;
var global_groups;
var global_paths;

socket.on('connect', function () {
    console.log('CONNECT')
    makeGraph();
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
        console.log("stop clicked!")
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

    socket.on('graphData', function (algodata) {
        var WIP = algodata.WIP;
        var E0 = algodata.FGI.E0;
        var E1 = algodata.FGI.E1;
        var E2 = algodata.FGI.E2;
        var FGI = E0 + E1 + E2;
        var time = algodata.time;

        tick(WIP, E0, E1, E2, FGI, time);
    });

    function makeGraph() {
        var limit = 60,
            duration = 750,
            now = new Date(Date.now() - duration)

        var width = 700,
            height = 400

        global_groups = {
            WIP: {
                value: 0,
                color: 'orange',
                data: []
            },
            FGI: {
                value: 0,
                color: 'green',
                data: []
            },

            E0: {
                value: 0,
                color: 'grey',
                data: []
            },

            E1: {
                value: 0,
                color: 'blue',
                data: []
            },

            E2: {
                value: 0,
                color: 'black',
                data: []
            }
        }

        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, 1000])

        var y = d3.scale.linear()
            .domain([0, 100])
            .range([height, 0])

        global_line = d3.svg.line()
            .interpolate('basis')
            .x(function(d) {
                return x(d)
            })
            .y(function(d) {
                return y(d)
            })

        var svg = d3.select('.graph').append('svg')
            .attr('class', 'chart')
            .attr('width', width)
            .attr('height', height + 50)

        var x_axis = svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(x.axis = d3.svg.axis().scale(x).orient('bottom'))

        var y_axis = svg.append('g')
            .attr('class', 'y-axis')
            .call(y.axis = d3.svg.axis().scale(y).orient('left'))


        global_paths = svg.append('g')

        for (var name in global_groups) {
            var group = global_groups[name]
            group.path = global_paths.append('path')
                .data([group.data])
                .attr('class', name + ' group')
                .style('stroke', group.color)
        }
        console.log(global_groups);
    }

    function tick(WIP, E0, E1, E2, FGI, time) {

        // Add new values
        for (var name in global_groups) {

            if(name === "WIP"){
                console.log('WIP: ' + WIP);
                var group = global_groups[name]
                group.data.push(time, WIP)
                group.path.attr('d', global_line)
            }

            if(name === "FGI"){
                console.log('FGI: ' + FGI);
                var group = global_groups[name];
                group.data.push(time, FGI);
                group.path.attr('d', global_line)
            }

            if(name === "E0"){
                console.log('E0: ' + E0)
                var group = global_groups[name]
                group.data.push(time, E0)
                group.path.attr('d', global_line)
            }

            if(name === "E1"){
                console.log('E1:' + E1)
                var group = global_groups[name]
                group.data.push(time, E1)
                group.path.attr('d', global_line)
            }

            if(name === "E2"){
                console.log('E2: ' + E2)
                var group = global_groups[name]
                group.data.push(time, E2)
                group.path.attr('d', global_line)
            }

            //group.data.push(group.value) // Real values arrive at irregular intervals
        }

        // // Shift domain
        // x.domain([now - (limit - 2) * duration, now - duration])
        //
        // // Slide x-axis left
        // axis.transition()
        //     .duration(duration)
        //     .ease('linear')
        //     .call(x.axis)
        //
        // // Slide paths left
        // global_paths.attr('transform', null)
        //     .transition()
        //     .duration(duration)
        //     .ease('linear')
        //     .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
        //     .each('end', tick)

        // // Remove oldest data point from each group
        // for (var name in groups) {
        //     var group = groups[name]
        //     group.data.shift()
        // }
    }

    socket.emit('subscribe-to-channel', {channel: PRIVATE_CHANNEL})
    console.log('SUBSCRIBED TO <' + PRIVATE_CHANNEL + '>');

})
