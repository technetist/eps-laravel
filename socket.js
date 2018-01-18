const SERVER_PORT = 8000

//node server imports
var express = require('express');
var app = express();
var server = require('http').Server(app);

//socket io specific imports
var io = require('socket.io').listen(server);
var redis = require('redis')

//files we are importing from the project
var algo = require('./algo');
var db_manager = require('./database_manager');

//redis creation
var sub = redis.createClient()

//variable declarations
var timerStart = 0;
var index = 0;
var totalWIP = 0;
var globalTpp, globalTppAmount, globaltppTimeTpp;
//Preproduction Machine State Monitoring
var m1,m2,m3,m4,m5;

var WIP = {A0_pre:0,A0_while:0,A0_post:0,
           B0_pre:0,B0_while:0,B0_post:0,
           C0_pre:0,C0_while:0,C0_post:0,
           D0_pre:0,D0_while:0,D0_post:0,
           D1_pre:0,D1_while:0,D1_post:0,
           E0_pre:0,E0_while:0,
           E1_pre:0,E1_while:0,
           E2_pre:0,E2_while:0};
var FGI = {E0: 0, E1: 0, E2: 0};
var serviceLevel = 0;

var tot_withdrawls = 0;
var pos_withdrawls = 0;

//general Machine State Monitoring
// 0 = Offline
// 1 = idle
// 2 = working
var mState = {m1:0,m2:0,m3:0,m4:0,m5:0};

var tpp = {m1:0,m2:0,m3:0,m4:0,m5:0};
var tppInput = false;
var timer = null;

var activeMachines = [];

//Variables for Gamestate (Preproduction Amounts, Orderlist and Customerlist)
var preproduction = [];
var OL = []
var CL = []
var CLindex = 0
var queue = []

var lastOrder = false

function resetParams() {
    timerStart = 0;
    index = 0;
    totalWIP = 0;

    WIP = {A0_pre:0,A0_while:0,A0_post:0,
        B0_pre:0,B0_while:0,B0_post:0,
        C0_pre:0,C0_while:0,C0_post:0,
        D0_pre:0,D0_while:0,D0_post:0,
        D1_pre:0,D1_while:0,D1_post:0,
        E0_pre:0,E0_while:0,
        E1_pre:0,E1_while:0,
        E2_pre:0,E2_while:0};
    FGI = {E0: 0, E1: 0, E2: 0};
    serviceLevel = 0;

    tot_withdrawls = 0;
    pos_withdrawls = 0;

    mState = {m1:0,m2:0,m3:0,m4:0,m5:0};

    tpp = {m1:0,m2:0,m3:0,m4:0,m5:0};
    tppInput = false;
    clearInterval(timer)
    timer = null;

    activeMachines = [];

//Variables for Gamestate (Preproduction Amounts, Orderlist and Customerlist)
    preproduction = [];
    OL = []
    CL = []
    queue = []
    CLindex = 0

    io.sockets.emit('appReset');

}

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
        mStateUpdater(data.name,'idle');
        io.sockets.emit('mStatus',{number1:mState.m1,number2:mState.m2,number3:mState.m3,number4:mState.m4,number5:mState.m5});
        console.log(data.name + "finished preproduction");
        console.log('m1' + m1 + "m2" + m2 + 'm3' + m3 + 'm4' + m4 + 'm5' + m5);

        if(m1 && m2 && m3 && m4 && m5){
            console.log("Hi111111!!111!!")
            console.log([m1, m2, m3, m4, m5]);
            io.sockets.emit("set");
        }
    })

    socket.on('preproCalcFin', function () {
        console.log('preproduction...');
        console.log(preproduction)
        if(preproduction.A0 > 0){
            io.sockets.emit('preproduce', {machine: "machine1",type:"A0",amount:preproduction.A0});
            mStateUpdater('machine1','work');
            WIP.A0_post = parseFloat(WIP.A0_post + preproduction.A0);
            console.log("m1 working");
            m1 = false;
        }else{
            m1 = true;
        }
        if(preproduction.B0 > 0){
            io.sockets.emit('preproduce', {machine: "machine2",type:"B0",amount:preproduction.B0});
            mStateUpdater('machine2','work');
            WIP.B0_post = parseFloat(WIP.B0_post + preproduction.B0);
            console.log("m2 working");

            m2 = false;
        }else{
            m2 = true;
        }
        if(preproduction.C0 > 0){
            io.sockets.emit('preproduce', {machine: "machine3",type:"C0",amount:preproduction.C0});
            mStateUpdater('machine3','work');
            WIP.C0_post = parseFloat(WIP.C0_post + preproduction.C0);
            console.log("m3 working");

            m3 = false;
        }else{
            m3 = true;
        }
        if(preproduction.D0 > 0 || preproduction.D1 > 0){
            console.log("m4 working");

            if(preproduction.D0 > 0) {
                io.sockets.emit('preproduce', {machine: "machine4",type: "D0", amount: preproduction.D0});
                WIP.D0_post = parseFloat(WIP.D0_post + preproduction.D0);

            }
            if(preproduction.D1 > 0){
                io.sockets.emit('preproduce', {machine: "machine4",type:"D1",amount:preproduction.D1});
                WIP.D1_post = parseFloat(WIP.D1_post + preproduction.D1);
            }
            mStateUpdater('machine4','work');
            m4 = false;
        }else{
            m4 = true;
        }
     
        if(preproduction.E0 > 0 || preproduction.E1 > 0 || preproduction.E2 > 0){
            console.log("m5 working");

            if(preproduction.E0 > 0){
                io.sockets.emit('preproduce', {machine: "machine5",type:"E0",amount:preproduction.E0})
                FGI.E0 = parseFloat(FGI.E0 + preproduction.E0);
            }
            if(preproduction.E1 > 0) {
                io.sockets.emit('preproduce', {machine: "machine5",type: "E1", amount: preproduction.E1})
                FGI.E1 = parseFloat(FGI.E1 + preproduction.E1);
            }
            if(preproduction.E2 > 0){
                io.sockets.emit('preproduce', {machine: "machine5",type:"E2",amount:preproduction.E2})
                FGI.E2 = parseFloat(FGI.E2 + preproduction.E2);
            }
            mStateUpdater('machine5','work');
            m5 = false;
        }else{
            m5 = true;
        }
    })

    //When the machine starts working on something, this socket call will be triggered
    socket.on('productionStarted', function(data){
        var machine = data.machine;
        var amount = data.amount;
        var product = data.product;

        switch(machine){
            case 'machine1':
                WIP.A0_pre = parseFloat(WIP.A0_pre - amount);
                WIP.A0_while = parseFloat(WIP.A0_while + amount);
                break;
            case 'machine2':
                WIP.B0_pre = parseFloat(WIP.B0_pre - amount);
                WIP.B0_while = parseFloat(WIP.B0_while + amount);
                break;
            case 'machine3':
                WIP.C0_pre = parseFloat(WIP.C0_pre - amount);
                WIP.C0_while = parseFloat(WIP.C0_while + amount);
                break;
            case 'machine4':
                if(product == 'D0'){
                    WIP.D0_pre = parseFloat(WIP.D0_pre - amount);
                    WIP.D0_while = parseFloat(WIP.D0_while + amount);
                }else if(product == 'D1'){
                    WIP.D1_pre = parseFloat(WIP.D1_pre - amount);
                    WIP.D1_while = parseFloat(WIP.D1_while + amount);
                }
                break;
            case 'machine5':
                if(product == 'E0'){
                    WIP.E0_pre = parseFloat(WIP.E0_pre - amount);
                    WIP.E0_while = parseFloat(WIP.E0_while + amount);
                }else if(product == 'E1'){
                    WIP.E1_pre = parseFloat(WIP.E1_pre - amount);
                    WIP.E1_while = parseFloat(WIP.E1_while + amount);
                }else if(product == 'E2'){
                    WIP.E2_pre = parseFloat(WIP.E2_pre - amount);
                    WIP.E2_while = parseFloat(WIP.E2_while + amount);

                }
                break;
        }
    });

    socket.on('start', function(){
        var parameters = db_manager.getParameters();
        var algoOutput = [];
        CL = db_manager.getCostReq();

        setTimeout(function() {
            console.log("Socket.js ssA0:" + parameters.ssA0);
            console.log("Customer List is: " + CL)
            algoOutput = algo.calculateProductionOrder(parameters);

            OL = algoOutput.orderlist;
            preproduction = algoOutput.preproduction;

            console.log(Object.keys(preproduction).length);
            console.log(preproduction);

            for (var k = 0; k < 30; k++) {
                console.log("index: " + k + ":" + JSON.stringify(OL[k]));
                console.log("CL LOOOOOOP: " + JSON.stringify(CL[k]));
            }

            socket.emit('mStatus',{number1:mState.m1,number2:mState.m2,number3:mState.m3,number4:mState.m4,number5:mState.m5});
            socket.emit('ready', preproduction);
        },5000);

    });

    socket.on("productionfinished", function(data) {
        mStateUpdater(data.machine,'idle');
        console.log(data.machine + " finished working")
        switch(data.machine) {
            case 'machine1':
                WIP.A0_while = parseFloat(WIP.A0_while - data.amount);
                WIP.A0_post = parseFloat(WIP.A0_post + data.amount);
                break;
            case 'machine2':
                WIP.B0_while = parseFloat(WIP.B0_while - data.amount);
                WIP.B0_post = parseFloat(WIP.B0_post + data.amount);
                break;
            case 'machine3':
                WIP.C0_while = parseFloat(WIP.C0_while - data.amount);
                WIP.C0_post = parseFloat(WIP.C0_post + data.amount);
                break;
            case 'machine4':
                if (data.product == 'D0') {
                    WIP.D0_while = parseFloat(WIP.D0_while - data.amount);
                    WIP.D0_post = parseFloat(WIP.D0_post + data.amount);
                } else if (data.product == 'D1') {
                    WIP.D1_while = parseFloat(WIP.D1_while - data.amount);
                    WIP.D1_post = parseFloat(WIP.D1_post + data.amount);
                }
                break;

            case 'machine5':
                if (data.product == 'E0') {
                    WIP.E0_while = parseFloat(WIP.E0_while - data.amount);
                    FGI.E0 = parseFloat(FGI.E0 + data.amount);
                } else if (data.product == 'E1') {
                    WIP.E1_while = parseFloat(WIP.E1_while - data.amount);
                    FGI.E1 = parseFloat(FGI.E1 + data.amount);
                } else if (data.product == 'E2') {
                    WIP.E2_while = parseFloat(WIP.E2_while - data.amount);
                    FGI.E2 = parseFloat(FGI.E2 + data.amount);
                }
                break;
        }
        //
        if(queue.length > 0) {
            if (data.machine == "machine5") {
                if (data.product == 'E0') {
                    if (queue[0].amount <= FGI.E0 && queue[0].product == 'E0') {
                        FGI.E0 = parseFloat(FGI.E0 - queue[0].amount);
                        queue.shift()
                    }
                } else if (data.product == 'E1') {
                    if (queue[0].amount <= FGI.E1 && queue[0].product == 'E1') {
                        FGI.E1 = parseFloat(FGI.E1 - queue[0].amount);
                        queue.shift()
                    }
                } else if (data.product == 'E2') {
                    if (queue[0].amount <= FGI.E2 && queue[0].product == 'E2') {
                        FGI.E2 = parseFloat(FGI.E2 - queue[0].amount);
                        queue.shift()
                    }
                }
            }
        }
    });

    socket.on('go', function () {
        io.sockets.emit('running');
        index = 0
        CLindex = 0
        console.log("timer start");
        console.log(OL);
        timerStart = 0;
        clearInterval(timer)
        timer = setInterval(function () {
            timerStart++;
            io.sockets.emit('timer', {time: timerStart});
            console.log(OL[index].time - timerStart);
            // console.log("NEXT ORDER IN " + OL[index].time - timerStart);

            //This compares the orderList time with the Timer Time
            if (OL[index].time == timerStart) {
                console.log(OL[index].machine + "started working on " + OL[index].amount + ' units of ' + OL[index].product);
                io.sockets.emit('produce', {
                    machine: OL[index].machine,
                    product: OL[index].product,
                    amount: OL[index].amount
                });
                mStateUpdater(OL[index].machine,'work');

                switch(OL[index].machine){
                    case 'machine1':
                        WIP.A0_pre = parseFloat(WIP.A0_pre + OL[index].amount);
                        break;
                    case 'machine2':
                        WIP.B0_pre = parseFloat(WIP.B0_pre + OL[index].amount);
                        WIP.A0_post = parseFloat(WIP.A0_post + OL[index].amount);
                        break;
                    case 'machine3':
                        WIP.C0_pre = parseFloat(WIP.C0_pre + OL[index].amount);
                        WIP.B0_post = parseFloat(WIP.B0_post - OL[index].amount);
                        break;
                    case 'machine4':
                        if(OL[index].product == 'D0'){
                            WIP.D0_pre = parseFloat(WIP.D0_pre + OL[index].amount);
                        }else if(OL[index].product == 'D1'){
                            WIP.D1_pre = parseFloat(WIP.D1_pre + OL[index].amount);
                        }
                        WIP.C0_post = parseFloat(WIP.C0_post - OL[index].amount);
                        break;
                    case 'machine5':
                        if(OL[index].product == 'E0'){
                            WIP.E0_pre = parseFloat(WIP.E0_pre + OL[index].amount);
                            WIP.D0_post = parseFloat(WIP.D0_post - OL[index].amount);
                        }else if(OL[index].product == 'E1'){
                            WIP.E1_pre = parseFloat(WIP.E1_pre + OL[index].amount);
                            WIP.D0_post = parseFloat(WIP.D0_post - OL[index].amount);
                        }else if(OL[index].product == 'E2'){
                            WIP.E2_pre = parseFloat(WIP.E2_pre + OL[index].amount);
                            WIP.D1_post = parseFloat(WIP.D1_post - OL[index].amount);
                        }
                        break;
                    default:
                        console.log('LOL.. something went wrong. sorry');
                        break;
                }                
                console.log("OL index amount: " + OL[index].amount);
                index++

            }
            //// Counters of service levels, but not for waiting orders
            //// Keep track of orders that are on time
            //This compares the CustomerList Time with the Timer Time
            ////Implement Waiting List!!!
            console.log("Cl time is: "+CL[CLindex].time);
            if(CL[CLindex].time == timerStart){
                console.log("Cl time inside is: "+CL[CLindex].time);
                tot_withdrawls++;
                if(CL[CLindex].product == 'E0'){
                    if(FGI.E0 >= CL[CLindex].amount){
                        FGI.E0 = parseFloat(FGI.E0 - CL[CLindex].amount);
                        pos_withdrawls++;
                    }else{
                        queue.push(CL[CLindex]);
                        console.log("queue : " + queue);
                    }
                }else if(CL[CLindex].product == 'E1') {
                    if (FGI.E1 >= CL[CLindex].amount) {
                        FGI.E1 = parseFloat(FGI.E1 - CL[CLindex].amount);
                        pos_withdrawls++;
                    } else {
                        queue.push(CL[CLindex]);
                        console.log("queue : " + queue);
                    }
                }else if(CL[CLindex].product == 'E2') {
                    if (FGI.E2 >= CL[CLindex].amount) {
                        FGI.E2 = parseFloat(FGI.E2 - CL[CLindex].amount)
                        pos_withdrawls++;
                    } else {
                        queue.push(CL[CLindex]);
                        console.log("queue : " + queue);
                    }
                }
                console.log("Customer withdrew " + CL[CLindex].amount + " Units of " + CL[CLindex].product);
                if(CLindex == CL.length){
                    //This is the last customer withdraw, game can End here, maybe?
                    io.sockets.emit('customerEnd');
                }
                CLindex++;
                serviceLevel = (pos_withdrawls/tot_withdrawls)*100;
            }

            totalWIP = 0
            //ESX6 
            for(var k in WIP){
                totalWIP = parseFloat(totalWIP + WIP[k]);
            }
            console.log("WIP: " + WIP);
            io.sockets.emit('graphData', {WIP: parseFloat(totalWIP), FGI:FGI, time:timerStart, serviceLevel})

            io.sockets.emit('mStatus', {number1: mState.m1, number2: mState.m2, number3: mState.m3, number4: mState.m4, number5: mState.m5})
            console.log("The WIP is: " + totalWIP);

        }, 1000);

    })

    //Maybe the emit stuff should happen on the frontend, so the tppInput is there when gameEnd is called
    socket.on('gameEnd', function() {
        //Notify Tablets that game has ended. THis should maybe happen on the Frontend!
        io.sockets.emit('gamefinish');
        //store stuff in database_manager
        if(tppInput){
            //Put data in database! :)
        }else{
            console.log('Could not access time per piece for machines');
        }
    })

    socket.on('tpp', function(data){
        switch(data.name){
            case 'machine1':
                tpp.m1 = data.tppAmount / data.tppTime;
                globaltppAmount = parseFloat(globaltppAmount + data.tppAmount);
                globaltppTime = parseFloat(globaltppTime + data.ttpTime);
                break;
            case 'machine2':
                tpp.m2 = data.tppAmount / data.tppTime;
                globaltppAmount = parseFloat(globaltppAmount + data.tppAmount);
                globaltppTime = parseFloat(globaltppTime + data.ttpTime);
                break;
            case 'machine3':
                tpp.m3 = data.tppAmount / data.tppTime;
                globaltppAmount = parseFloat(globaltppAmount + data.tppAmount);
                globaltppTime = parseFloat(globaltppTime + data.ttpTime);
                break;
            case 'machine4':
                tpp.m4 = data.tppAmount / data.tppTime;
                globaltppAmount = parseFloat(globaltppAmount + data.tppAmount);
                globaltppTime = parseFloat(globaltppTime + data.ttpTime);
                break;
            case 'machine5':
                tpp.m5 = data.tppAmount / data.tppTime;
                globaltppAmount = parseFloat(globaltppAmount + data.tppAmount);
                globaltppTime = parseFloat(globaltppTime + data.ttpTime);
                break;
            default:
                console.log('Error saving Time per Piece Value :(');
                break;
        }
        globalTpp = parseFloat(globaltppAmount / globaltppTime);
        tppInput = true;
    })

    socket.on('stopPressed', function () {
        clearInterval(timer)
    })

    socket.on('reset', function () {
        resetParams()
    });

    socket.on('disconnect', function () {
        console.log('DISCONNECT')
    })

})

// Start listening for client connections
server.listen(SERVER_PORT, function () {
    console.log('Listening to incoming client connections on port ' + SERVER_PORT)
})

//Helper Function for mStates
function mStateUpdater(machine,type){
    switch(machine){
        case 'machine1':
            if(type == 'work'){
                mState.m1 = 2;
            }else{
                mState.m1 = 1;
            }
            break;
        case 'machine2':
            if(type == 'work'){
                mState.m2 = 2;
            }else{
                mState.m2 = 1;
            }
            break;
        case 'machine3':
            if(type == 'work'){
                mState.m3 = 2;
            }else{
                mState.m3 = 1;
            }
            break;
        case 'machine4':
            if(type == 'work'){
                mState.m4 = 2;
            }else{
                mState.m4 = 1;
            }
            break;
        case 'machine5':
            if(type == 'work'){
                mState.m5 = 2;
            }else{
                mState.m5 = 1;
            }
            break;
        default:
            console.log('failed to update machine state');
            break;

    }
}
