var mysql = require('mysql')
require('dotenv').config()

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
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
        var parameters;
        connection.query('SELECT MRPparameter_1,'+
            'MRPparameter_2, MRPparameter_3, MRPparameter_4, MRPparameter_5,'+ 
            'MRPparameter_6,MRPparameter_7,MRPparameter_8,MRPparameter_9,'+
            'MRPparameter_10,MRPparameter_11,MRPparameter_11,MRPparameter_12'+
            'FROM sessions', function(err, rows, fields) {
            if(err) throw err
            var i = rows.length;
            parameters={ssA0: rows[i].MRPparameter_1, ssB0: rows[i].MRPparameter_2, ssC0: rows[i].MRPparameter_3, 
                        ssD0: rows[i].MRPparameter_4, ssD1: rows[i].MRPparameter_5, ssE0: rows[i].MRPparameter_6,
                        ssE1: rows[i].MRPparameter_7, ssE2: rows[i].MRPparameter_8, lsA0: rows[i].MRPparameter_9,
                        lsB0: rows[i].MRPparameter_10,lsC0: rows[i].MRPparameter_11,lsD0: rows[i].MRPparameter_12,
                        lsD1: rows[i].MRPparameter_13,lsE0: rows[i].MRPparameter_14,lsE1: rows[i].MRPparameter_15,
                        lsE2: rows[i].MRPparameter_16,ltA0: rows[i].MRPparameter_17,ltB0: rows[i].MRPparameter_18,
                        ltC0: rows[i].MRPparameter_19,ltD0: rows[i].MRPparameter_20,ltD1: rows[i].MRPparameter_21,
                        ltE0: rows[i].MRPparameter_22,ltE1: rows[i].MRPparameter_23,ltE2: rows[i].MRPparameter_24}
            })
        return parameters;
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