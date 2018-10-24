const db = require('../Util/connection');

let tipoGastoModel = {};

tipoGastoModel.getTipoGasto = (callback) => {

    if (db.connection) {
      db.select('SELECT * FROM Tipo_Gasto', function (rows) {
        callback(null, rows);
      });
    } else{
      var err={mesage:'dont connected!'};
      callback(null,err);
    }
};
tipoGastoModel.insertTipoGasto = (tipoGastoData, callback) => {
  if (db.connection) {
    db.insert('INSERT INTO Tipo_Gasto SET ?', tipoGastoData,(err, result) => {
        if (err) {
          console.log(err);
          process.on('uncaughtException', function (err) {
            console.log('Caught exception: ', err);
            callback(null,err);
          });
        } else {
          callback(null, result);
        }
      }
    )
  }
};

tipoGastoModel.deleteTipoGasto = (Id_Tipo_Gasto, callback) => {
  if (db.connection) {
    var sqlExists = `
      select tg.Id_Tipo_Gasto from Tipo_Gasto tg where tg.Id_Tipo_Gasto = ${db.connection.escape(Id_Tipo_Gasto)}
    `;
    db.select(sqlExists, (row) => {
      if (row.length>0) {
        var sql = `DELETE FROM Tipo_Gasto WHERE Id_Tipo_Gasto=` + db.connection.escape(Id_Tipo_Gasto);
        db.deleteRow(sql, (err, result) => {
          if (err) {
            console.log(err);
            process.on('uncaughtException', function (err) {
              console.log('Caught exception: ', err);
              callback(null,err);
            });
          } else {
            callback(null, result);
          }
        });
      } else {
        callback(null, {
          "msg": "not Exists"
        });
      }
    });
  }
};

tipoGastoModel.updateTipoGasto = (tipoGastoData, callback) => {
  if (db.connection) {
    var sql = `
      UPDATE Tipo_Gasto tg SET
      tg.Descripcion_Gasto = ${db.connection.escape(tipoGastoData.Descripcion_Gasto)}      
      WHERE u.Id_Tipo_Gasto = ${tipoGastoData.Id_Tipo_Gasto}`;
    db.update(sql, function (err, result) {
      if (err) {
        console.log(err);
        process.on('uncaughtException', function (err) {
          console.log('Caught exception: ', err);
          callback(null,err);
        });
      } else {
        callback(null, result)
      }
    });
  }
};
module.exports = tipoGastoModel;
