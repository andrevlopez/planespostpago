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
  host     : 'sl-us-south-1-portal.7.dblayer.com',
  port: 22970,
  user     : 'admin',
  password : 'WGDCDYPJKWYODIHR',
  database : 'compose'
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
app.use('/', express.static('public'));
require('./routes/index')(app);
require('./routes/users')(app, connection);
require('./routes/solicitudes')(app, connection);
require('./routes/permisos')(app, connection);

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
