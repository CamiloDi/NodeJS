const db = require('../Util/connection');

let userModel = {};

userModel.getUsers = (callback) => {

    if (db.connection) {
      db.select('SELECT * FROM Usuario', function (rows) {
        callback(null, rows);
      });
    } else{
      var err={mesage:'dont connected!'};
      callback(null,err);
    }
};
userModel.insertUser = (userData, callback) => {
  if (db.connection) {
    db.insert('INSERT INTO Usuario SET ?', userData,(err, result) => {
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

userModel.deleteUser = (Id_usuario, callback) => {
  if (db.connection) {
    var sqlExists = `
      select u.Correo from Usuario u where u.Id_usuario = ${db.connection.escape(Id_usuario)}
    `;
    db.select(sqlExists, (row) => {
      if (row.length>0) {
        var sql = `DELETE FROM Usuario WHERE Id_usuario=` + db.connection.escape(Id_usuario);
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

userModel.updateUser = (userData, callback) => {
  if (db.connection) {
    var sql = `
      UPDATE Usuario u SET
      u.Nombre_Usuario = ${db.connection.escape(userData.Nombre_Usuario)},
      u.Password = ${db.connection.escape(userData.Password)},
      u.Correo = ${db.connection.escape(userData.Correo)}
      WHERE u.Id_usuario = ${userData.Id_usuario}`;
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
module.exports = userModel;
