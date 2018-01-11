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
    connection.query('INSERT INTO' + table, function (err, rows, fields) {
        if (err) throw err

        console.log(rows)
    })
}

function db_pull() {

}

function pushSession(){

}

function getParameters() {

    return parameters[];
}

function getCostReq(){

    var costReqArray = [];

    return costReqArray;
}