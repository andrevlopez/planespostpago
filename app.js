var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const cors = require('cors');
var http = require('http');
const mysql = require('mysql');

var app = express();

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


var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);
/**
 * Create HTTP server.
 */
var server = http.createServer(app);
var io = require('socket.io')(server);


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

require('./sockets')(io, connection);
require('./routes/users')(app, connection);
require('./routes/solicitudes')(app, connection);
require('./routes/permisos')(app, connection);
require('./routes/planes')(app, connection);
require('./routes/notificaciones')(app, connection);

var debug = require('debug')('demo:server');


/**
 * Get port from environment and store in Express.
 */

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}



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
