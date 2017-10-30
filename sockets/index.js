const sql  = require('sql-crud');
const crud = new sql("mysql");
module.exports = (io,con) => {
  io.on('connection', socket => {
  	// Sockets
    socket.on('new-notification', body => {
      crud.insert(con, {
        insertInto: 'notificaciones',
        values: {
      		tipo: body.tipo,
      		detalles: body.detalles,
      		fecha: body.fecha
      	 }
        });
      console.log('que fue pues');
      socket.emit('broadcast-notification');
  	 });
  });
}  