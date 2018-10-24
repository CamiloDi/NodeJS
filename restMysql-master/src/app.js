const express = require('express');
const app =express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

app.set('port',process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));

//middelwares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
require('./routes/userRoutes')(app);
require('./routes/gastoRoutes')(app);
require('./routes/ingresoRoutes')(app);
require('./routes/familiaRoutes')(app);
require('./routes/formaPagoRoutes')(app);
require('./routes/tipoGastoRoutes')(app);

//static files
// static files
//app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
  console.log('server on port 3000');
});
