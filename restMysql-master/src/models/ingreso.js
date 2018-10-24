const db = require('../Util/connection');

let ingresorModel = {};

ingresorModel.getIngreso = (callback) => {

    if (db.connection) {
      db.select('SELECT * FROM Ingreso', function (rows) {
        callback(null, rows);
      });
    } else{
      var err={mesage:'dont connected!'};
      callback(null,err);
    }
};
ingresorModel.insertIngreso = (ingresorData, callback) => {
    if (db.connection) {
      db.insert('INSERT INTO Ingreso SET ?', ingresorData,(err, result) => {
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
  ingresorModel.deleteIngreso = (Id_Ingreso, callback) => {
    if (db.connection) {
      var sqlExists = `
        select i.Nombre_Ingreso from Ingreso i where i.Id_Ingreso = ${db.connection.escape(Id_Ingreso)}
      `;
      db.select(sqlExists, (row) => {
        if (row.length>0) {
          var sql = `DELETE FROM Ingreso WHERE Id_Ingreso=` + db.connection.escape(Id_Ingreso);
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
  
  ingresorModel.updateIngreso = (ingresorData, callback) => {
    if (db.connection) {
      var sql = `
        UPDATE Ingreso i SET
        i.Nombre_Ingreso = ${db.connection.escape(ingresorData.Nombre_Ingreso)},
        i.Valor_Ingreso = ${db.connection.escape(ingresorData.Valor_Ingreso)},
        i.Descripcion_Ingreso = ${db.connection.escape(ingresorData.Descripcion_Ingreso)},
        i.Id_Periodo = ${db.connection.escape(ingresorData.Id_Periodo)},
        i.Fecha_Ingreso = ${db.connection.escape(ingresorData.Fecha_Ingreso)},
        i.Id_Usuario = ${db.connection.escape(ingresorData.Id_Usuario)},
        i.Repite = ${db.connection.escape(ingresorData.Repite)}
        WHERE i.Id_Ingreso = ${ingresorData.Id_Ingreso}`;
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

module.exports = ingresorModel;
