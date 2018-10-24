const mysql = require('mysql');


config= {
  host: 'awsbd.c1cou5raqnap.us-east-2.rds.amazonaws.com',
  user: 'Camilodi',
  password: 'Camilodi',
  database: 'gestionCuentasBD'
//port : '3306'
};


var connection = mysql.createConnection(config);


function select(query,callback) 
{
  connection.query(query,(err, rows) => {
    if (err) {
      console.log(err);
      process.on('uncaughtException', function(err) {
        console.log('Caught exception: ', err);
        callback(err);
      });
    } else {
      callback(rows);
    }
  });
}

function insert(query,data,callback){
  connection.query(query, data,(err, result) => {
      if (err) {
        console.log(err);
        process.on('uncaughtException', function (err) {
          console.log('Caught exception: ', err);
          callback(null,err);
        });
      } else {
        callback(null, {
          'insertId': result.insertId
        });
      }
    }
  );
}

function deleteRow(query,callback){
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      process.on('uncaughtException', function (err) {
        console.log('Caught exception: ', err);
        callback(null,err);
      });
    } else {
      callback(null, {
        "msg": "deleted"
      });
    }
  });
}

function update(query,callback){
  connection.query(query, function (err, result) {
    if (err) {
      console.log(err);
      process.on('uncaughtException', function (err) {
        console.log('Caught exception: ', err);
        callback(null,err);
      });
    } else {
      console.log(result);
      callback(null, {
        "msg": "success Update"
      })
    }
  });
}

module.exports = 
{
    connection:connection,
    select: select,
    insert:insert,
    deleteRow:deleteRow,
    update:update
}  