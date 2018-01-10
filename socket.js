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

//Preproduction Mashine State Monitoring
var m1,m2,m3,m4,m5;


var timer = 0;

var activeMachines = [];

var mysql = require('mysql')

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'homestead',
    password : 'secret',
    database : 'eps'
});

var algo = require('./algo');

var preproduction = [];
var OL = []

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

        socket.on('checkout', function (data) {
            activeMachines.pop(data.name)
            console.log(activeMachines)
            console.log(activeMachines.length)
        })
    })

    socket.on('finPreProd',function(data){
        switch(data.name) {
            case "machine1":
                console.log(data.name + "finished preproduction");
                m1 = true;
                //delete the lower ones plx
                m2 = true;
                m3 = true;
                m4 = true;
                m5 = true;
                break;
            case "machine2":
                m2 = true;
                break;
            case "machine3":
                m3 = true;
                break;
            case "machine4":
                m4 = true;
                break;
            case "machine5":
                m5 = true;
                break;
            default:
                console.log("log in error");

        }
        console.log(data.name + "finished preproduction");

        if(m1 && m2 && m3 && m4 && m5){
            socket.emit("set");
        }
    })

    socket.on('preproCalcFin', function () {

        console.log('preproduction...');
        console.log(preproduction)
        if(preproduction.A0 > 0){
            io.sockets.emit('preproduce', {machine: "machine1",type:"A0",amount:preproduction.A0});
            console.log("m1 working");
            m1 = false;
        }else{
            m1 = true;
        }
        if(preproduction.B0 > 0){
            io.sockets.emit('preproduce', {machine: "machine2",type:"B0",amount:preproduction.B0});
            console.log("m2 working");

            m2 = false;
        }else{
            m2 = true;
        }
        if(preproduction.C0 > 0){
            io.sockets.emit('preproduce', {machine: "machine3",type:"C0",amount:preproduction.C0});
            console.log("m3 working");

            m3 = false;
        }else{
            m3 = true;
        }
        if(preproduction.D0 > 0 || preproduction.D1 > 0){
            console.log("m4 working");

            if(preproduction.D0 > 0) {
                io.sockets.emit('preproduce', {machine: "machine4",type: "D0", amount: preproduction.D0});

            }
            if(preproduction.D1 > 0){
                io.sockets.emit('preproduce', {machine: "machine4",type:"D1",amount:preproduction.D1});
            }
            m4 = false;
        }else{
            m4 = true;
        }
        if(preproduction.E0 > 0 || preproduction.E1 > 0 || preproduction.E2 > 0){
            console.log("m5 working");

            if(preproduction.E0 > 0){
                io.sockets.emit('preproduce', {machine: "machine5",type:"E0",amount:preproduction.E0})
            }
            if(preproduction.E1 > 0) {
                io.sockets.emit('preproduce', {machine: "machine5",type: "E1", amount: preproduction.E1})
            }
            if(preproduction.E2 > 0){
                io.sockets.emit('preproduce', {machine: "machine5",type:"E2",amount:preproduction.E2})
            }
            m5 = false;
        }else{
            m5 = true;
        }
    })

    socket.on('start', function () {
        var algoOutput = algo.calculateProductionOrder();

        OL = algoOutput.orderlist;
        preproduction = algoOutput.preproduction;

        console.log(Object.keys(preproduction).length);
        console.log(preproduction);

        for (var k = 0; k < 30; k++) {
            console.log("index: " + k + ":" + JSON.stringify(OL[k]));
        }
        //console.log(out



        socket.emit('ready', {values: preproduction});
    });

    socket.on('go', function () {

        index = 0;

        console.log("timer start");
        timerStart = 0;
        timer = setInterval(function () {
            timerStart++;
            io.sockets.emit('timer', {time: timerStart});

            if (timerStart === OL[index].time) {
                io.sockets.emit('produce', {
                    machine: OL[index].machine,
                    product: OL[index].product,
                    amount: OL[index].amount
                });
                index++

            }

        }, 1000);

    })

    socket.on('stop', function () {
        //pause timer
    });

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



//GET-REQUESTS
app.get('/getstats', function (req, res) {

    connection.query('SELECT * FROM stats', function (err, rows, fields) {
        if (err) throw err

        console.log(rows)
    })

    //Set our collections
    // var stats_collection = db.get('stats_collection');
    //
    // //Magic
    // stats_collection.find({}, {}, function (e, docs) {
    //     res.json(docs);
    // });
});
// app.get('/getorderlist', function (req, res) {
//     //Set our internal DB variable
//     var db = req.db;
//
//     //Set our collections
//     var orderlist_collection = db.get('orderlist_collection');
//
//     //Magic
//     orderlist_collection.find({}, {}, function (e, docs) {
//         res.json(docs);
//     });
// });
// app.get('/checkstartstop', function (req, res) {
//     var db = req.db;
//
//     var startstop_collection = db.get('startstop_collection');
//
//     startstop_collection.find({}, {}, function (e, docs) {
//
//         res.json(docs);
//     });
// });
// app.get('/getcostreq', function (req, res) {
//     var db = req.db;
//
//     var costreq_collection = db.get('costreq_collection');
//
//     costreq_collection.find({}, {}, function (e, docs) {
//         res.json(docs);
//     });
// });
// app.get('/getinventory', function (req, res) {
//     var db = req.db;
//
//     var inventory_collection = db.get('inventory_collection');
//
//     inventory_collection.find({}, {}, function (e, docs) {
//         res.json(docs);
//     });
// }); //is not used atm
// app.get('/getsessions', function (req, res) {
//     var db = req.db;
//
//     var session_collection = db.get('session_collection');
//     //session_collection.remove({});
//     session_collection.find({}, {}, function (e, docs) {
//         res.json(docs);
//     });
// });
//
// //POST-REQUESTS FOR WEBSITE
// app.post('/websignin', function (req, res) {
//     //console.log(req.body);
//     var db = req.db;
//
//     var username = req.body.username;
//     var password = req.body.password;
//
//     var user_collection = db.get('user_collection');
//
//     user_collection.find({
//         "username": username,
//         "password": password
//     }, {}, function (e, docs) {
//         if (docs != "") {
//             res.send("*Approved*");
//             //console.log('approved');
//         } else {
//             res.send("*Denied*");
//             //console.log('denied');
//         }
//     });
// });
// app.post('/webstartstop', function (req, res) {
//     var db = req.db;
//
//     var startstop = req.body.startstop;
//     var parameter = req.body.parameter;
//
//     var stats_collection = db.get('stats_collection');
//     var startstop_collection = db.get('startstop_collection');
//
//     if (startstop == "stop") {
//         stats_collection.remove({});
//         startstop_collection.remove({});
//
//         startstop_collection.insert([{
//             "startstop": "false",
//             "parameter": parameter
//         }]);
//
//         stats_collection.insert([{
//             "machine": "machine1",
//             "status": "non-active",
//         }, {
//             "machine": "machine2",
//             "status": "non-active",
//         }, {
//             "machine": "machine3",
//             "status": "non-active",
//         }, {
//             "machine": "machine4",
//             "status": "non-active",
//         }, {
//             "machine": "machine5",
//             "status": "non-active",
//         }]);
//
//     }
//     else if (startstop == "start") {
//         stats_collection.remove({});
//         startstop_collection.remove({});
//
//         startstop_collection.insert([{
//             "startstop": "true",
//             "parameter": parameter
//         }]);
//
//         stats_collection.insert([
//             {
//                 "machine": "machine1",
//                 "status": "idle",
//             }, {
//                 "machine": "machine2",
//                 "status": "idle",
//             }, {
//                 "machine": "machine3",
//                 "status": "idle",
//             }, {
//                 "machine": "machine4",
//                 "status": "idle",
//             }, {
//                 "machine": "machine5",
//                 "status": "idle",
//
//             }]);
//     }
//     else if (startstop == "create") {
//         t3 = 0;
//         stats_collection.remove({});
//         startstop_collection.remove({});
//
//         startstop_collection.insert([{
//             "startstop": "false"
//         }]);
//         stats_collection.insert([
//             {
//                 "machine": "machine1",
//                 "status": "non-active",
//             }, {
//                 "machine": "machine2",
//                 "status": "non-active",
//             }, {
//                 "machine": "machine3",
//                 "status": "non-active",
//             }, {
//                 "machine": "machine4",
//                 "status": "non-active",
//             }, {
//                 "machine": "machine5",
//                 "status": "non-active",
//             }]);
//     } //delete the create?
//
//     res.send(startstop);
// });
// app.post('/makeproductorders', function (req, res) {
//
//     var MRP_Planning_Parameters = req.body;
//     //console.log(req.body);
//
//     var CO = [[1, 191, 2], [0, 214, 1], [0, 227, 1], [1, 242, 2], [2, 282, 1], [0, 313, 1], [1, 314, 2], [1, 337, 2], [0, 349, 1], [1, 363, 2], [0, 390, 1], [0, 435, 1], [1, 443, 2], [0, 452, 1], [1, 476, 2], [1, 496, 2], [0, 533, 1], [1, 567, 2], [0, 569, 1], [1, 602, 2], [0, 624, 1], [2, 630, 1], [1, 632, 2], [0, 641, 1], [1, 712, 2], [0, 715, 1], [1, 729, 2], [2, 765, 1], [0, 792, 1], [1, 794, 2], [1, 815, 2], [0, 826, 1], [1, 838, 2], [0, 862, 1], [0, 903, 1], [1, 910, 2], [0, 919, 1], [1, 942, 2], [1, 963, 2], [0, 1000, 1], [1, 1034, 2], [0, 1036, 1], [1, 1070, 2], [0, 1092, 1], [2, 1098, 1], [1, 1099, 2], [0, 1109, 1], [1, 1154, 2], [0, 1158, 1], [1, 1193, 2], [0, 1216, 1], [0, 1229, 1], [1, 1244, 2], [2, 1284, 1], [0, 1315, 1], [1, 1316, 2], [1, 1339, 2], [0, 1351, 1], [1, 1365, 2], [0, 1392, 1], [0, 1437, 1], [1, 1445, 2], [0, 1454, 1], [1, 1478, 2], [1, 1498, 2], [0, 1535, 1], [1, 1569, 2], [0, 1571, 1], [1, 1604, 2], [0, 1626, 1], [2, 1632, 1], [1, 1632, 2], [0, 1643, 1], [1, 1714, 2], [0, 1717, 1], [1, 1731, 2], [2, 1767, 1], [0, 1794, 1], [1, 1796, 2], [1, 1817, 2], [0, 1828, 1], [1, 1840, 2], [0, 1864, 1], [0, 1905, 1], [1, 1912, 2], [0, 1921, 1], [1, 1944, 2], [1, 1965, 2], [0, 2002, 1], [1, 2036, 2], [0, 2038, 1], [1, 2072, 2], [0, 2094, 1], [2, 2100, 1], [1, 2101, 2], [0, 2111, 1], [1, 2156, 2]];
//     var GR, SR, Inventory, NR, InventoryLotsizeCalculation, PO_rec, PO_rel;
//     var planning_horizon = 2201;
//     var numberofmaterials = 8;
//     var Materials = ["E0", "E1", "E2", "D0", "D1", "C0", "B0", "A0"];
//     var Bom = [[0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0]];
//
//     var productArray = [];
//     var secondesArray = [];
//     var quantityArray = [];
//     var machineArray = [];
//
//     var current_Materialnummer = "";
//     var current_pos = 0;
//
//     // vvvv-------------FUNCTIONS-------------vvvv
//     var createArray = function (rows, cols, defaultValue) {
//         var arr = [];
//         for (var i = 0; i < rows; i++) {
//
//             // Creates an empty line
//             arr.push([]);
//
//             // Adds cols to the empty line:
//             arr[i].push(new Array(cols));
//
//             for (var j = 0; j < cols; j++) {
//                 // Initializes:
//                 arr[i][j] = defaultValue;
//             }
//         }
//
//         return arr;
//     }
//
//     var f_set_array_zero = function () {
//         GR = createArray(numberofmaterials, planning_horizon, 0);
//         SR = createArray(numberofmaterials, planning_horizon, 0);
//         Inventory = createArray(numberofmaterials, planning_horizon, 0);
//         NR = createArray(numberofmaterials, planning_horizon, 0);
//         InventoryLotsizeCalculation = createArray(numberofmaterials, planning_horizon, 0);
//         PO_rec = createArray(numberofmaterials, planning_horizon, 0);
//         PO_rel = createArray(numberofmaterials, planning_horizon, 0);
//     }
//
//     var f_write_CO_in_GR_array = function () {
//         for (var i = 0; i < CO.length; i++) {
//             GR[CO[i][0]][CO[i][1]] = CO[i][2];
//             //console.log(GR[CO[i][0]][CO[i][1]]); this is good
//         }
//     }
//
//     var f_netting = function (current_pos) {
//         var safetystock = 0;
//         safetystock = MRP_Planning_Parameters[current_pos][0]; //this is good too
//         for (var i = 1; i < planning_horizon; i++) {
//
//             NR[current_pos][i] = Math.max(GR[current_pos][i] - Inventory[current_pos][i - 1] + safetystock, 0); //this is not good.....
//             //console.log(NR[current_pos][i]);
//             Inventory[current_pos][i] = Math.max(Inventory[current_pos][i - 1] - GR[current_pos][i], safetystock);
//         }
//     }
//
//     var f_lotsize_FOQ = function (Losgroessenparameter, Differenzbedarf) {
//
//         var x = 0;
//         x = Math.ceil((Differenzbedarf / Losgroessenparameter)) * Losgroessenparameter;
//         return x;
//     }
//
//     var f_lotsizing = function (current_pos) {
//         var fertig_gestellte_planauftraege_value = 0;
//         var nettobedarf2 = 0;
//         for (var i = 1; i < planning_horizon; i++) {
//             //console.log(NR[current_pos][i]);
//             nettobedarf2 = NR[current_pos][i] - InventoryLotsizeCalculation[current_pos][i - 1];
//             if (nettobedarf2 > 0) {
//                 fertig_gestellte_planauftraege_value = f_lotsize_FOQ(MRP_Planning_Parameters[current_pos][1], nettobedarf2);
//                 PO_rec[current_pos][i] = fertig_gestellte_planauftraege_value;
//                 fertig_gestellte_planauftraege_value = 0;
//             } else {
//                 PO_rec[current_pos][i] = 0;
//             }
//             InventoryLotsizeCalculation[current_pos][i] = InventoryLotsizeCalculation[current_pos][i - 1] - NR[current_pos][i] + PO_rec[current_pos][i];
//         }
//     }
//
//     var f_backwardscheduling = function (current_pos, time) {
//         var p = 0;
//         for (var i = 1; i < planning_horizon; i++) {
//             if (i - MRP_Planning_Parameters[current_pos][2] > 0) {
//                 p = i - MRP_Planning_Parameters[current_pos][2];
//             } else {
//                 if (time > 1) {
//                     p = 1;
//                 } else {
//                     p = 0;
//                 }
//             }
//             PO_rel[current_pos][p] += PO_rec[current_pos][i];
//         }
//     }
//
//     var f_bomexplosion = function (current_pos) {
//         var pos_submaterial = 0;
//         var j = 0;
//         if (current_pos >= 0) {
//             for (var x = 0; x < Bom[current_pos].length; x++) {
//                 pos_submaterial = x;
//                 if (Bom[current_pos][x] > 0) {
//                     for (j = 1; j < planning_horizon; j++) {
//                         GR[pos_submaterial][j] += PO_rel[current_pos][j] * Bom[current_pos][x];
//                     }
//                 }
//             }
//         }
//     }
//
//     var f_WriteProductionOrderstoConsole = function () {
//         //console.log("Material    Timeperiod    Quantity");
//         for (var j = 1; j < planning_horizon; j++) {
//             for (var i = 0; i < numberofmaterials; i++) {
//                 if (PO_rel[i][j] > 0) {
//                     secondesArray.push(j);
//                     quantityArray.push(PO_rel[i][j]);
//                     productArray.push(Materials[i]);
//                     var str = Materials[i].split('');
//                     if (str[0] == "A")
//                         machineArray.push("machine1");
//                     if (str[0] == "B")
//                         machineArray.push("machine2");
//                     if (str[0] == "C")
//                         machineArray.push("machine3");
//                     if (str[0] == "D")
//                         machineArray.push("machine4");
//                     if (str[0] == "E")
//                         machineArray.push("machine5");
//                 }
//             }
//         }
//     }
//
//     var f_push_to_db = function (products, seconds, quantity, machines) {
//         var db = req.db;
//
//         var orderlist_collection = db.get('orderlist_collection');
//         var inventory_collection = db.get('inventory_collection');
//         inventory_collection.remove({});
//         orderlist_collection.remove({});
//         var data = [];
//         for (i = 0; i < products.length; i++) {
//             data.push({
//                 "orderID": i.toString(),
//                 "time": seconds[i].toString(),
//                 "product": products[i],
//                 "machine": machines[i],
//                 "amount": quantity[i].toString()
//             });
//         }
//         orderlist_collection.insert(data);
//         var sendinventory =
//             {
//                 "E0": (PO_rel[0][0]).toString(),
//                 "E1": (PO_rel[1][0]).toString(),
//                 "E2": (PO_rel[2][0]).toString(),
//                 "D0": (PO_rel[3][0]).toString(),
//                 "D1": (PO_rel[4][0]).toString(),
//                 "C0": (PO_rel[5][0]).toString(),
//                 "B0": (PO_rel[6][0]).toString(),
//                 "A0": (PO_rel[7][0]).toString()
//             };
//         res.send(sendinventory);
//         inventory_collection.insert([
//             {
//                 "E0": (PO_rel[0][0]).toString(),
//                 "E1": (PO_rel[1][0]).toString(),
//                 "E2": (PO_rel[2][0]).toString(),
//                 "D0": (PO_rel[3][0]).toString(),
//                 "D1": (PO_rel[4][0]).toString(),
//                 "C0": (PO_rel[5][0]).toString(),
//                 "B0": (PO_rel[6][0]).toString(),
//                 "A0": (PO_rel[7][0]).toString()
//             }]);
//     }
//
//     // ^^^^-------------FUNCTIONS-------------^^^^
//
//     f_set_array_zero();
//     f_write_CO_in_GR_array();
//
//     for (var i = 0; i < numberofmaterials; i++) {
//         current_Materialnummer = Materials[i];
//         f_netting(i);
//         f_lotsizing(i);
//         f_backwardscheduling(i, 0);
//         f_bomexplosion(i);
//     }
//
//     f_WriteProductionOrderstoConsole();
//     f_push_to_db(productArray, secondesArray, quantityArray, machineArray);
//     //console.log("RMP CALCULATION DONE! ENJOY...");
//
// });
// app.post('/makeinventory', function (req, res) {
//     //console.log(req.body);
//     var db = req.db;
//
//     var A0 = req.body.A0;
//     var B0 = req.body.B0;
//     var C0 = req.body.C0;
//     var D0 = req.body.D0;
//     var D1 = req.body.D1;
//     var E0 = req.body.E0;
//     var E1 = req.body.E1;
//     var E2 = req.body.E2;
//
//     var inventory_collection = db.get('inventory_collection');
//
//     inventory_collection.remove({});
//
//     inventory_collection.insert([{
//         "A0": A0,
//         "B0": B0,
//         "C0": C0,
//         "D0": D0,
//         "D1": D1,
//         "E0": E0,
//         "E1": E1,
//         "E2": E2
//     }]);
//     res.send("ok");
// }); //is not used atm
// app.post('/websavesession', function (req, res) {
//     var db = req.db;
//     //console.log(req.body);
//     var body = req.body;
//
//     var session_collection = db.get('session_collection');
//
//     session_collection.find({}, {}, function (e,docs){
//         if(docs.length >= 10){
//             session_collection.remove(docs[0]);
//             session_collection.insert(body);
//         }
//         else{
//             session_collection.insert(body);
//         }
//     });
//     res.send("Session saved!");
// });
// app.post('/webdeletesession',function (req,res){
//     var db = req.db;
//
//     var sessionNumber = req.body.number;
//
//     var session_collection = db.get('session_collection')
//
//     session_collection.find({}, {}, function (e,docs){
//         session_collection.remove(docs[sessionNumber]);
//     });
//     res.send("ok");
// });
//
//
// //POST-REQUESTS FOR APPLICATION
// app.post('/appstatus', function (req, res) {
//     var db = req.db;
//     //console.log(req.body);
//     var machine = req.body.machine;
//     var status = req.body.status;
//     //console.log("/appstatus " + status);
//     var stats_collection = db.get('stats_collection');
//
//     stats_collection.find({
//         "machine": machine
//     }, {}, function (e, docs) {
//         if (docs != "") {
//             stats_collection.update({
//                 "machine": machine
//             }, {
//                 $set: {
//                     "status": status,
//                 }
//             });
//         } else {
//             //res.send("this machine doesnt excists");
//         }
//     });
//     res.send("status changed");
// });
// app.post('/appsignin', function (req, res) {
//     //console.log(req.body);
//     var db = req.db;
//
//     var username = req.body.username;
//     var password = req.body.password;
//
//     var user_collection = db.get('user_collection');
//     var stats_collection = db.get('stats_collection');
//
//     user_collection.find({
//         "username": username,
//         "password": password
//     }, {}, function (e, docs) {
//         if (docs != "") {
//             res.send("Approved");
//             //console.log('Approved');
//             stats_collection.update({
//                 "machine": username
//             }, {
//                 $set: {
//                     "status": "idle"
//                 }
//             });
//         } else {
//             res.send("Denied");
//             //console.log("Denied");
//         }
//     });
// });
