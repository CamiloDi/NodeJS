const db = require('../Util/connection');

let familiaModel = {};

familiaModel.getFamilia = (callback) => {

    if (db.connection) {
      db.select('SELECT * FROM Familia', function (rows) {
        callback(null, rows);
      });
    } else{
      var err={mesage:'dont connected!'};
      callback(null,err);
    }
};
familiaModel.insertFamilia = (familiaData, callback) => {
  if (db.connection) {
    db.insert('INSERT INTO Familia SET ?', familiaData,(err, result) => {
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

familiaModel.deleteFamilia = (Id_Familia, callback) => {
  if (db.connection) {
    var sqlExists = `
      select f.Id_Familia from Familia f where f.Id_Familia = ${db.connection.escape(Id_Familia)}
    `;
    db.select(sqlExists, (row) => {
      if (row.length>0) {
        var sql = `DELETE FROM Familia WHERE Id_Familia=` + db.connection.escape(Id_Familia);
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

familiaModel.updateFamilia = (familiaData, callback) => {
  if (db.connection) {
    var sql = `
      UPDATE Familia f SET
      f.Nro_Familiar = ${db.connection.escape(familiaData.Nro_Familiar)},
      f.Id_Usuario = ${db.connection.escape(familiaData.Id_Usuario)}
      WHERE u.Id_Familia = ${familiaData.Id_Familia}`;
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
module.exports = familiaModel;
