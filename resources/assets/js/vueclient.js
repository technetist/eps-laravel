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


    //
    // let resetvariables = function(){
    //     CO = [[1, 191, 2], [0, 214, 1], [0, 227, 1], [1, 242, 2], [2, 282, 1], [0, 313, 1], [1, 314, 2], [1, 337, 2], [0, 349, 1], [1, 363, 2], [0, 390, 1], [0,    435, 1], [1, 443, 2], [0, 452, 1], [1, 476, 2], [1, 496, 2], [0, 533, 1], [1, 567, 2], [0, 569, 1], [1, 602, 2], [0, 624, 1], [2, 630, 1], [1, 632, 2], [0, 641, 1], [1, 712, 2], [0, 715, 1], [1, 729, 2], [2, 765, 1], [0, 792, 1], [1, 794, 2], [1, 815, 2], [0, 826, 1], [1, 838, 2], [0, 862, 1], [0, 903, 1], [1, 910, 2], [0, 919, 1], [1, 942, 2], [1, 963, 2], [0, 1000, 1], [1, 1034, 2], [0, 1036, 1], [1, 1070, 2], [0, 1092, 1], [2, 1098, 1], [1, 1099, 2], [0, 1109, 1], [1, 1154, 2], [0, 1158, 1], [1, 1193, 2], [0, 1216, 1], [0, 1229, 1], [1, 1244, 2], [2, 1284, 1], [0, 1315, 1], [1, 1316, 2], [1, 1339, 2], [0, 1351, 1], [1, 1365, 2], [0, 1392, 1], [0, 1437, 1], [1, 1445, 2], [0, 1454, 1], [1, 1478, 2], [1, 1498, 2], [0, 1535, 1], [1, 1569, 2], [0, 1571, 1], [1, 1604, 2], [0, 1626, 1], [2, 1632, 1], [1, 1632, 2], [0, 1643, 1], [1, 1714, 2], [0, 1717, 1], [1, 1731, 2], [2, 1767, 1], [0, 1794, 1], [1, 1796, 2], [1, 1817, 2], [0, 1828, 1], [1, 1840, 2], [0, 1864, 1], [0, 1905, 1], [1, 1912, 2], [0, 1921, 1], [1, 1944, 2], [1, 1965, 2], [0, 2002, 1], [1, 2036, 2], [0, 2038, 1], [1, 2072, 2], [0, 2094, 1], [2, 2100, 1], [1, 2101, 2], [0, 2111, 1], [1, 2156, 2]];
    //     inventory_M1 = [];
    //     inventory_M2 = [];
    //     inventory_M3 = [];
    //     inventory_M4 = [];
    //     inventory_M5 = [];
    //
    //     inventory_A0 = [];
    //     inventory_B0 = [];
    //     inventory_C0 = [];
    //     inventory_D0 = [];
    //     inventory_D1 = [];
    //     inventory_E0 = [];
    //     inventory_E1 = [];
    //     inventory_E2 = [];
    //
    //     //TODO: Comment in if not working!!
    //     // fix_inventory_E0;
    //     // fix_inventory_E1;
    //     // fix_inventory_E2;
    //
    //     wip_inventory = 0;
    //     fgi_inventory = 0;
    //     inventory = 0;
    //
    //     totalWip = 0;
    //     totalFgi = 0;
    //     totalInventory = 0;
    //
    //     wip_array = [];
    //     fgi_array = [];         //Finished good inventory
    //     inv_array = [];
    //
    //     time_M1 = 0;
    //     time_M2 = 0;
    //     time_M3 = 0;
    //     time_M4 = 0;
    //     time_M5 = 0;
    //
    //     service = 0;
    //     serviceLevel = [];
    //     lastservicelevel = 0;
    //     totalOrders = 0;
    //
    // };

    socket.on('ready', function(data) {
        console.log("it's ready!");
        //how to trigger a modal
        document.getElementById('myModal').style.visibility = 'visible';
        //how to use the ok and cancel button


        //move timer start to here
        socket.emit("timer");
    });


    socket.emit('subscribe-to-channel', {channel: PRIVATE_CHANNEL})
    console.log('SUBSCRIBED TO <' + PRIVATE_CHANNEL + '>');

})
