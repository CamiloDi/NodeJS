const formaPagoModel = require('../models/formaPago');

module.exports = function(app) {

  app.get('/formaPago', (req, res) => {
    formaPagoModel.getFormaPago((err, data) => {
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

  app.post('/formaPago', (req, res) => {
    var formaPagoData = {
        Descripcion_Pago: req.body.Descripcion_Pago,
        Banco: req.body.Banco,
        Numero_Cuenta: req.body.Numero_Cuenta
    };

    formaPagoModel.insertFormaPago(formaPagoData, (err, data) => {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Inserted a new method of payment",
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
  app.put('/formaPago/:Id_Pago', (req, res) => {
    const formaPagoData = {
        Id_Pago: req.params.Id_Pago,
        Descripcion_Pago: req.body.Descripcion_Pago,
        Banco: req.body.Banco,
        Numero_Cuenta: req.body.Numero_Cuenta
    };
    formaPagoModel.updateFormaPago(formaPagoData, function(err, data) {
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

  app.delete('/formaPago/:Id_Pago', (req, res) => {
    var Id_Pago = req.params.Id_Pago;
    formaPagoModel.deleteFormaPago(Id_Pago, (err, data) => {
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
