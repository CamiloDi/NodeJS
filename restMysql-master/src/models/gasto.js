const db = require('../Util/connection');

let gastoModel = {};

gastoModel.getGastos = (callback) => {

    if (db.connection) {
      db.select('SELECT * FROM Gasto', function (rows) {
        callback(null, rows);
      });
    } else{
      var err={mesage:'dont connected!'};
      callback(null,err);
    }
};
gastoModel.insertGasto = (gastoData, callback) => {
  if (db.connection) {
    db.insert('INSERT INTO Gasto SET ?', gastoData,(err, result) => {
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
gastoModel.deleteGasto = (Id_Gasto, callback) => {
  if (db.connection) {
    var sqlExists = `
      select g.Valor_Gasto from Gasto g where g.Id_Gasto = ${db.connection.escape(Id_Gasto)}
    `;
    db.select(sqlExists, (row) => {
      if (row.length>0) {
        var sql = `DELETE FROM Gasto WHERE Id_Gasto=` + db.connection.escape(Id_Gasto);
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
gastoModel.updateGasto = (gastoData, callback) => {
  if (db.connection) {
    var sql = `
      UPDATE Gasto g SET
      g.Nombre_Gasto = ${db.connection.escape(gastoData.Nombre_Gasto)},
      g.Valor_Gasto = ${db.connection.escape(gastoData.Valor_Gasto)},
      g.Descripcion_Gasto = ${db.connection.escape(gastoData.Descripcion_Gasto)},
      g.Id_Periodo = ${db.connection.escape(gastoData.Id_Periodo)},
      g.Fecha_Gasto = ${db.connection.escape(gastoData.Fecha_Gasto)},
      g.Id_Usuario = ${db.connection.escape(gastoData.Id_Usuario)},
      g.Id_Tipo_Gasto = ${db.connection.escape(gastoData.Id_Tipo_Gasto)},
      g.Id_Pago = ${db.connection.escape(gastoData.Id_Pago)},
      g.Repite = ${db.connection.escape(gastoData.Repite)},
      g.Pagado = ${db.connection.escape(gastoData.Pagado)},
      WHERE g.Id_Gasto = ${gastoData.Id_Gasto}`;
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
module.exports = gastoModel;