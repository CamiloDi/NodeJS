const FamiliaModel = require('../models/familia');

module.exports = function(app) {

  app.get('/familia', (req, res) => {
    FamiliaModel.getFamilia((err, data) => {
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

  app.post('/familia', (req, res) => {
    var familiaData = {
        Nro_Familiar: req.body.Nro_Familiar,
        Id_Usuario: req.body.Id_Usuario
    };

    FamiliaModel.insertFamilia(familiaData, (err, data) => {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Inserted a new member of family",
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
  app.put('/familia/:Id_Familia', (req, res) => {
    const familiaData = {
      Id_Familia: req.params.Id_Familia,
      Nro_Familiar: req.body.Nro_Familiar,
        Id_Usuario: req.body.Id_Usuario
    };
    FamiliaModel.updateFamilia(familiaData, function(err, data) {
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

  app.delete('/familia/:Id_Familia', (req, res) => {
    var Id_Familia = req.params.Id_Familia;
    FamiliaModel.deleteFamilia(Id_Familia, (err, data) => {
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
