const IngresoModel = require('../models/ingreso');

module.exports = function(app) {

    app.get('/ingreso', (req, res) => {
        IngresoModel.getIngreso((err, data) => {
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
    app.post('/ingreso', (req, res) => {
        var ingresorData = {
          Nombre_Ingreso: req.body.Nombre_Ingreso,
          Valor_Ingreso: req.body.Valor_Ingreso,
          Descripcion_Ingreso: req.body.Descripcion_Ingreso,
          Id_Periodo: req.body.Id_Periodo,
          Fecha_Ingreso: req.body.Fecha_Ingreso,
          Id_Usuario: req.body.Id_Usuario,
          Repite: req.body.Repite
        };
    
        IngresoModel.insertIngreso(ingresorData, (err, data) => {
          if (data && data.insertId) {
            res.status(200).json({
              success: true,
              msg: "Inserted a new income",
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
      app.put('/ingreso/:Id_Ingreso', (req, res) => {
        const ingresorData = {
          Id_Ingreso: req.params.Id_Ingreso,
          Nombre_Ingreso: req.body.Nombre_Ingreso,
          Valor_Ingreso: req.body.Valor_Ingreso,
          Descripcion_Ingreso: req.body.Descripcion_Ingreso,
          Id_Periodo: req.body.Id_Periodo,
          Fecha_Ingreso: req.body.Fecha_Ingreso,
          Id_Usuario: req.body.Id_Usuario,
          Repite: req.body.Repite
        };
        IngresoModel.updateIngreso(ingresorData, function(err, data) {
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
    
      app.delete('/ingreso/:Id_Ingreso', (req, res) => {
        var Id_Ingreso = req.params.Id_Ingreso;
        IngresoModel.deleteIngreso(Id_Ingreso, (err, data) => {
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
