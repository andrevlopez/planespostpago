var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

var app = express();

var connection = mysql.createConnection({
  host     : 'v02yrnuhptcod7dk.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: 3306,
  user     : 'fobnc7zhk24bxs5j',
  password : 'r34e80zgeoohv03f',
  database : 'ym8eb0mkoif9bfy1'
});

connection.connect(function(error) {
  if(error) {
    console.log(error);
  } else {
    console.log('Conectado Exitosamente');
  }
}); 


app.use(cors());
app.options('*', cors());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

// view engine setup
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.use('/', express.static('dist'));
require('./routes/index')(app);
require('./routes/users')(app, connection);
require('./routes/solicitudes')(app, connection);
require('./routes/permisos')(app, connection);
require('./routes/planes')(app, connection);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status || 500);
});

module.exports = app;
