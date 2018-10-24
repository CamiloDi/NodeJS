const gastoModel = require('../models/gasto');

module.exports = function(app) {

    app.get('/gastos', (req, res) => {
      gastoModel.getGastos((err, data) => {
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
    app.post('/gastos', (req, res) => {
      var gastoData = {
        Nombre_Gasto: req.body.Nombre_Gasto,
        Valor_Gasto: req.body.Valor_Gasto,
        Descripcion_Gasto: req.body.Descripcion_Gasto,
        Id_Periodo: req.body.Id_Periodo,
        Fecha_Gasto: req.body.Fecha_Gasto,
        Id_Usuario: req.body.Id_Usuario,
        Id_Tipo_Gasto: req.body.Id_Tipo_Gasto,
        Id_Pago: req.body.Id_Pago,
        Repite: req.body.Repite,
        Pagado: req.body.Pagado
      };
  
      gastoModel.insertGasto(gastoData, (err, data) => {
        if (data && data.insertId) {
          res.status(200).json({
            success: true,
            msg: "Inserted a new bill",
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
    app.delete('/gastos/:Id_Gasto', (req, res) => {
      var Id_Gasto = req.params.Id_Gasto;
      gastoModel.deleteGasto(Id_Gasto, (err, data) => {
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
    app.put('/gastos/:Id_Gasto', (req, res) => {
      const gastoData = {
        Id_Gasto:req.params.Id_Gasto,
        Nombre_Gasto: req.body.Nombre_Gasto,
        Valor_Gasto: req.body.Valor_Gasto,
        Descripcion_Gasto: req.body.Descripcion_Gasto,
        Id_Periodo: req.body.Id_Periodo,
        Fecha_Gasto: req.body.Fecha_Gasto,
        Id_Usuario: req.body.Id_Usuario,
        Id_Tipo_Gasto: req.body.Id_Tipo_Gasto,
        Id_Pago: req.body.Id_Pago,
        Repite: req.body.Repite,
        Pagado: req.body.Pagado
      };
      gastoModel.updateGasto(gastoData, function(err, data) {
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
}