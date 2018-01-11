var mysql = require('mysql')

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'homestead',
    password : 'secret',
    database : 'eps'
});

// function db_connection(crud, table) {
//     connection.query('SELECT * FROM ' + table, function (err, rows, fields) {
//         if (err) throw err
//
//         console.log(rows)
//     })
// }

module.exports = {

    db_push: function ()
    {

    },

    db_pull: function () {

    },

    pushSession: function (utiliaztion_array,
                         total_time,
                         mrp_perameters_array,
                         averages_array, lead_time,
                         planning_algorithm,
                         service_level,
                         session_name,
                         time_per_piece,
                         time_per_piece_per_machine_array) {
        connection.query('INSERT INTO sessions () VALUES ()', function (err, rows, fields) {
            if (err) throw err

            console.log(rows)
        })
    },

    getParameters: function () {

        // return parameters[];
    },

    getCostReq: function () {
        var costReqArray = [];

        connection.query('SELECT * FROM cost_reqs', function (err, rows, fields) {
            if (err) throw err

            //console.log(rows)

            for(var i = 0; i < rows.length; i++){
                //console.log(rows[i].time,rows[i].amount,rows[i].product)
                costReqArray.push({time: rows[i].time,amount: rows[i].amount,product: rows[i].product});
            }
        })

        //console.log(costReqArray);


        return costReqArray;
    }
}