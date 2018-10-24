const db = require('../Util/connection');

let formaPagoModel = {};

formaPagoModel.getFormaPago = (callback) => {

    if (db.connection) {
      db.select('SELECT * FROM Forma_Pago', function (rows) {
        callback(null, rows);
      });
    } else{
      var err={mesage:'dont connected!'};
      callback(null,err);
    }
};
formaPagoModel.insertFormaPago = (formaPagoData, callback) => {
  if (db.connection) {
    db.insert('INSERT INTO Forma_Pago SET ?', formaPagoData,(err, result) => {
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

formaPagoModel.deleteFormaPago = (Id_Pago, callback) => {
  if (db.connection) {
    var sqlExists = `
      select fp.Id_Pago from Forma_Pago fp where fp.Id_Pago = ${db.connection.escape(Id_Pago)}
    `;
    db.select(sqlExists, (row) => {
      if (row.length>0) {
        var sql = `DELETE FROM Forma_Pago WHERE Id_Pago=` + db.connection.escape(Id_Pago);
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

formaPagoModel.updateFormaPago = (formaPagoData, callback) => {
  if (db.connection) {
    var sql = `
      UPDATE Forma_Pago fp SET
      fp.Numero_Cuenta = ${db.connection.escape(formaPagoData.Numero_Cuenta)},
      fp.Banco = ${db.connection.escape(formaPagoData.Banco)},
      fp.Descripcion_Pago = ${db.connection.escape(formaPagoData.Descripcion_Pago)}
      WHERE fp.Id_Pago = ${formaPagoData.Id_Pago}`;
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
module.exports = formaPagoModel;