var mysql = require('mysql')

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'homestead',
    password : 'secret',
    database : 'eps'
});

function db_connection(crud, table) {
    connection.query('SELECT * FROM ' + table, function (err, rows, fields) {
        if (err) throw err

        console.log(rows)
    })
}

function db_push() {

}

function db_pull() {

}

function pushSession(utiliaztion_array,
                     total_time,
                     mrp_perameters_array,
                     averages_array, lead_time,
                     planning_algorithm,
                     service_level,
                     session_name,
                     time_per_piece,
                     time_per_piece_per_machine_array){
    connection.query('INSERT INTO sessions () VALUES ()', function (err, rows, fields) {
        if (err) throw err

        console.log(rows)
    })
}

function getParameters() {

    return parameters[];
}

function getCostReq(){

    var costReqArray = [];

    return costReqArray;
}