const UserModel = require('../models/user');

module.exports = function(app) {

  app.get('/users', (req, res) => {
    UserModel.getUsers((err, data) => {
      if(err){
        res.status(500).json({
          success:false,
          error:err
        });
      }else{
        res.status(200).json({
          success:true,
          data:data});
      }      
    });
  });

  app.post('/users', (req, res) => {
    var userData = {
      Correo: req.body.Correo,
      Password: req.body.Password,
      Nombre_Usuario: req.body.Nombre_Usuario
    };

    UserModel.insertUser(userData, (err, data) => {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Inserted a new user",
          data: data
        });
      } else {
        res.status(500).json({
          success: false,
          msg: "Error"
        });
      }
    });
  });
  app.put('/users/:Id_usuario', (req, res) => {
    const userData = {
      Id_usuario: req.params.Id_usuario,
      Correo: req.body.Correo,
      Password: req.body.Password,
      Nombre_Usuario: req.body.Nombre_Usuario
    };
    UserModel.updateUser(userData, function(err, data) {
      if (data && data.msg) {
        res.status(200).json({
          data
        });
      } else {
        res.status(500).json({
          success: false,
          msg: 'Error'
        });
      }
    });
  });

  app.delete('/users/:Id_usuario', (req, res) => {
    var Id_usuario = req.params.Id_usuario;
    UserModel.deleteUser(Id_usuario, (err, data) => {
      if (data && data.msg === 'deleted' || data.msg == 'not Exists') {
        res.status(200).json({
          success: true,
          data: data
        });
      } else {
        res.status(500).json({
          success: false,
          msg: 'Error'
        });
      }
    });
  });
}
