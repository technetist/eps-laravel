const PRIVATE_CHANNEL = 'ppc-game-communication-broadcast'
var io = require('socket.io-client')
var Vue = require('vue');
var socket = io.connect('http://'+ app_ip +':8000');
var global_Inventory_line;
var global_ServiceLevel_line;
var global_Inventory_groups;
var global_ServiceLevel_groups;
var global_Inventory_paths;
var global_ServiceLevel_paths;
var planning_algorithm;
var WIP_dataPoints = [];
var FGI_dataPoints = [];
var E0_dataPoints = [];
var E1_dataPoints = [];
var E2_dataPoints = [];
var ServiceLevel_datapoints = [];

var inventory_chart;
var servicelevel_chart;

socket.on('connect', function () {
    console.log('CONNECT')
    makeInventoryGraph();
    makeServiceLevelGraph();
    document.getElementById("start").addEventListener("click", function () {

        this.setAttribute("disabled", true)

        if(document.getElementById("mrp").checked){
            planning_algorithm = "MRP";
        }

        if(document.getElementById("kanban").checked){
            planning_algorithm = "Kanban";
        }

        if(document.getElementById("conwip").checked){
            planning_algorithm = "Conwip";
        }

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
        $('#StopModal').modal('show');
        console.log("stop clicked!")
    })

    document.getElementById("reset").addEventListener("click", function () {
        document.getElementById("start").removeAttribute("disabled");
        socket.emit("reset")
        console.log("reset clicked!")
    })

    document.getElementById("modal3_save").addEventListener("click", function (){
        var session_name = document.getElementById('session_name');
        socket.emit("gameEnd", {session_name: document.getElementById('session_name'),
            planning_algorithm: planning_algorithm});
        $('#StopModal').modal('hide');
    })

    document.getElementById("modal3_resume").addEventListener("click", function (){
        $('#StopModal').modal('hide');
    })

    document.getElementById("modal3_cancel").addEventListener("click", function (){
        $('#StopModal').modal('hide');
        socket.emit('stop');
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
        var ServiceLevel = algodata.servicelevel;

        var WIP_array = {name: "WIP", x: time, y: WIP}
        var FGI_array = {name: "FGI", x: time, y: FGI}
        var E0_array = {name: "E0", x: time, y: E0}
        var E1_array = {name: "E1", x: time, y: E1}
        var E2_array = {name: "E2", x: time, y: E2}

        var ServiceLevel_array = {x: time, y: ServiceLevel}

        addInventoryData(WIP_array);
        addInventoryData(FGI_array);
        addInventoryData(E0_array);
        addInventoryData(E1_array);
        addInventoryData(E2_array);
        addServiceLevelData(ServiceLevel_array);


    });


    function toogleInventoryDataSeries(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        inventory_chart.render();
    }

        function toogleServiceLevelDataSeries(e){
            if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else{
                e.dataSeries.visible = true;
            }
            servicelevel_chart.render();
        }

    function makeInventoryGraph(){

        inventory_chart = new CanvasJS.Chart("inventory_graph", {
                title: {
                    text: "Inventory Chart"
                },
                axisX: {
                    title: "Time",
                    suffix: "(s)"
                },
                axisY2: {
                    title: "Amount",
                    suffix: "(pcs)"
                },

                legend: {
                    cursor: "pointer",
                    verticalAlign: "top",
                    horizontalAlign: "center",
                    dockInsidePlotArea: true,
                    itemclick: toogleInventoryDataSeries
                },

                toolTip: {
                    shared: true
                },

                data: [{
                    type: "line",
                    axisYType: "secondary",
                    name: "WIP",
                    showInLegend: true,
                    markerSize: 0,
                    dataPoints: WIP_dataPoints
                },

                {
                    type: "line",
                    axisYType: "secondary",
                    name: "FGI",
                    showInLegend: true,
                    markerSize: 0,
                    dataPoints: FGI_dataPoints
                },

                {
                    type: "line",
                    axisYType: "secondary",
                    name: "E0",
                    showInLegend: true,
                    markerSize: 0,
                    dataPoints: E0_dataPoints
                },


                {
                    type: "line",
                    axisYType: "secondary",
                    name: "E1",
                    showInLegend: true,
                    markerSize: 0,
                    dataPoints: E1_dataPoints
                },

                    {
                    type: "line",
                    axisYType: "secondary",
                    name: "E2",
                    showInLegend: true,
                    markerSize: 0,
                    dataPoints: E2_dataPoints
                }]

        });

        inventory_chart.render();
    }

    function addInventoryData(data) {
        if(data.name == "WIP"){
            WIP_dataPoints.push({x: data.x, y: data.y});
            inventory_chart.render();
        }

        if(data.name == "FGI"){
            FGI_dataPoints.push({x: data.x, y: data.y});
            inventory_chart.render();
        }

        if(data.name == "E0"){
            E0_dataPoints.push({x: data.x, y: data.y});
            inventory_chart.render();
        }

        if(data.name == "E1"){
            E1_dataPoints.push({x: data.x, y: data.y});
            inventory_chart.render();
        }

        if(data.name == "E2"){
            E2_dataPoints.push({x: data.x, y: data.y});
            inventory_chart.render();
        }
    }





    // function makeInventoryGraph() {
    //     var limit = 60,
    //         duration = 750,
    //         now = new Date(Date.now() - duration)
    //
    //     var width = 500,
    //         height = 400
    //
    //     global_Inventory_groups = {
    //         WIP: {
    //             value: 0,
    //             color: 'orange',
    //             data: []
    //         },
    //         FGI: {
    //             value: 0,
    //             color: 'green',
    //             data: []
    //         },
    //
    //         E0: {
    //             value: 0,
    //             color: 'grey',
    //             data: []
    //         },
    //
    //         E1: {
    //             value: 0,
    //             color: 'blue',
    //             data: []
    //         },
    //
    //         E2: {
    //             value: 0,
    //             color: 'black',
    //             data: []
    //         }
    //     }
    //
    //     var x = d3.scale.linear()
    //         .range([0, width])
    //         .domain([0, 1000])
    //
    //     var y = d3.scale.linear()
    //         .domain([0, 100])
    //         .range([height, 0])
    //
    //     global_Inventory_line = d3.svg.line()
    //         .interpolate('basis')
    //         .x(function(d) {
    //             return x(d)
    //         })
    //         .y(function(d, i) {
    //             return y(i)
    //         })
    //
    //     var svg = d3.select('.inventory_graph').append('svg')
    //         .attr('class', 'chart')
    //         .attr('width', width)
    //         .attr('height', height + 50)
    //
    //     var x_axis = svg.append('g')
    //         .attr('class', 'x-axis')
    //         .attr('transform', 'translate(0,' + height + ')')
    //         .call(x.axis = d3.svg.axis().scale(x).orient('bottom'))
    //         .append("text")
    //         .attr("fill", "#000")
    //         .attr("x", 6)
    //         .attr("dx", "0.71em")
    //         .attr("text-anchor", "begin")
    //         .attr("margin-bottom", 5)
    //         .text("Time (s)");
    //
    //     var y_axis = svg.append('g')
    //         .attr('class', 'y-axis')
    //         .call(y.axis = d3.svg.axis().scale(y).orient('left'))
    //         .append("text")
    //         .attr("fill", "#000")
    //         .attr("transform", "rotate(-90)")
    //         .attr("y", 6)
    //         .attr("dy", "0.71em")
    //         .attr("text-anchor", "end")
    //         .text("Amount (pcs)");
    //
    //
    //     global_Inventory_paths = svg.append('g')
    //
    //     for (var name in global_Inventory_groups) {
    //         var group = global_Inventory_groups[name]
    //         group.path = global_Inventory_paths.append('path')
    //             .data([group.data])
    //             .attr('class', name + ' group')
    //             .style('stroke', group.color)
    //     }
    //     console.log(global_Inventory_groups);
    // }
    //
    // function inventoryTick(WIP, E0, E1, E2, FGI, time) {
    //
    //     // Add new values
    //     for (var name in global_Inventory_groups) {
    //
    //         if (name === "WIP") {
    //             console.log('WIP: ' + WIP);
    //             var group = global_Inventory_groups[name]
    //             group.data.push(time, WIP)
    //             group.path.attr('d', global_Inventory_line)
    //         }
    //
    //         if (name === "FGI") {
    //             console.log('FGI: ' + FGI);
    //             var group = global_Inventory_groups[name];
    //             group.data.push(FGI, time);
    //             group.path.attr('d', global_Inventory_line)
    //         }
    //
    //         if (name === "E0") {
    //             console.log('E0: ' + E0)
    //             var group = global_Inventory_groups[name]
    //             group.data.push(E0, time)
    //             group.path.attr('d', global_Inventory_line)
    //         }
    //
    //         if (name === "E1") {
    //             console.log('E1:' + E1)
    //             var group = global_Inventory_groups[name]
    //             group.data.push(E1, time);
    //             group.path.attr('d', global_Inventory_line)
    //         }
    //
    //         if (name === "E2") {
    //             console.log('E2: ' + E2)
    //             var group = global_Inventory_groups[name]
    //             group.data.push(E2, time)
    //             group.path.attr('d', global_Inventory_line)
    //         }
    //
    //         //group.data.push(group.value) // Real values arrive at irregular intervals
    //     }
    // }


    function makeServiceLevelGraph() {
        servicelevel_chart = new CanvasJS.Chart("servicelevel_graph", {
            title: {
                text: "Servicelevel Chart"
            },
            ServiceLevel: [{
                type: "line",
                dataPoints: ServiceLevel_datapoints
            }],

            axisX: {
                title: "Time",
                suffix: "(s)"
            },

            axisY2: {
                title: "Servicelevel",
                suffix: "%"
            },

            legend: {
                cursor: "pointer",
                verticalAlign: "top",
                horizontalAlign: "center",
                dockInsidePlotArea: true,
                itemclick: toogleServiceLevelDataSeries
            },

            toolTip: {
                shared: true
            },

            data: [{
                type: "line",
                axisYType: "secondary",
                name: "Servicelevel",
                showInLegend: true,
                markerSize: 0,
                dataPoints: ServiceLevel_datapoints
            }]

        });
    }


    function addServiceLevelData(data) {
            ServiceLevel_datapoints.push({x: data.x, y: data.y});
            servicelevel_chart.render();
    }


    //
    // function makeServiceLevelGraph() {
    //     var limit = 60,
    //         duration = 750,
    //         now = new Date(Date.now() - duration)
    //
    //     var width = 500,
    //         height = 400
    //
    //     global_ServiceLevel_groups = {
    //         ServiceLevel: {
    //             value: 0,
    //             color: 'blue',
    //             data: []
    //         },
    //     }
    //
    //     var x = d3.scale.linear()
    //         .range([0, width])
    //         .domain([0, 1000])
    //
    //     var y = d3.scale.linear()
    //         .domain([0, 100])
    //         .range([height, 0])
    //
    //     global_ServiceLevel_line = d3.svg.line()
    //         .interpolate('interpolate')
    //         .x(function(d) {
    //             return x(d.x)
    //         })
    //         .y(function(d) {
    //             return y(d.y)
    //         })
    //
    //     var svg = d3.select('.servicelevel_graph').append('svg')
    //         .attr('class', 'chart')
    //         .attr('width', width)
    //         .attr('height', height + 50)
    //
    //     var x_axis = svg.append('g')
    //         .attr('class', 'x-axis')
    //         .attr('transform', 'translate(0,' + height + ')')
    //         .call(x.axis = d3.svg.axis().scale(x).orient('bottom'))
    //         .append("text")
    //         .attr("fill", "#000")
    //         .attr("x", 6)
    //         .attr("dx", "0.71em")
    //         .attr("margin-bottom", 5)
    //         .attr("text-anchor", "begin")
    //         .text("Time (s)");
    //
    //
    //     var y_axis = svg.append('g')
    //         .attr('class', 'y-axis')
    //         .call(y.axis = d3.svg.axis().scale(y).orient('left'))
    //         .append("text")
    //         .attr("fill", "#000")
    //         .attr("transform", "rotate(-90)")
    //         .attr("y", 6)
    //         .attr("dy", "0.71em")
    //         .attr("text-anchor", "end")
    //         .text("Servicelevel(%)");
    //
    //
    //
    //     global_ServiceLevel_paths = svg.append('g')
    //
    //     for (var name in global_ServiceLevel_groups) {
    //         var group = global_ServiceLevel_groups[name]
    //         group.path = global_ServiceLevel_paths.append('path')
    //             .data([group.data])
    //             .attr('class', name + ' group')
    //             .style('stroke', group.color)
    //     }
    //     console.log(global_ServiceLevel_groups);
    // }
    //
    //
    // function serviceLevelTick(ServiceLevel, time) {
    //
    //     // Add new values
    //     for (var name in global_ServiceLevel_groups) {
    //
    //         if (name === "ServiceLevel") {
    //             console.log('ServiceLevel: ' + ServiceLevel);
    //             var group = global_ServiceLevel_groups[name]
    //             group.data = [
    //                 {x: ServiceLevel.x, y: ServiceLevel.y},
    //             ]
    //             group.path.attr('d', global_ServiceLevel_line)
    //
    //         }
    //
    //         //group.data.push(group.value) // Real values arrive at irregular intervals
    //     }
    // }

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


    socket.emit('subscribe-to-channel', {channel: PRIVATE_CHANNEL})
    console.log('SUBSCRIBED TO <' + PRIVATE_CHANNEL + '>');

})
