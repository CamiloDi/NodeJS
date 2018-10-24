const tipoGastoData = require('../models/tipoGasto');

module.exports = function(app) {

  app.get('/tipoGasto', (req, res) => {
    tipoGastoData.getTipoGasto((err, data) => {
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

  app.post('/tipoGasto', (req, res) => {
    var tipoGastosData = {
        Descripcion_Gasto: req.body.Descripcion_Gasto
    };

    tipoGastoData.insertTipoGasto(tipoGastosData, (err, data) => {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Inserted a new bill type",
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
  app.put('/tipoGasto/:Id_Tipo_Gasto', (req, res) => {
    const tipoGastosData = {
      Id_Tipo_Gasto: req.params.Id_Tipo_Gasto,
      Descripcion_Gasto: req.body.Descripcion_Gasto
    };
    tipoGastoData.updateTipoGasto(tipoGastosData, function(err, data) {
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

  app.delete('/tipoGasto/:Id_Tipo_Gasto', (req, res) => {
    var Id_Tipo_Gasto = req.params.Id_Tipo_Gasto;
    tipoGastoData.deleteTipoGasto(Id_Tipo_Gasto, (err, data) => {
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
