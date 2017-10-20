const sql  = require('sql-crud');
const crud = new sql("mysql");
module.exports = (app, con) => {
  app.get('/notificaciones', (req, res) => {
    crud.select(con, {
      select: '*',
      from: 'notificaciones'
    }, (err, row) => {
      err?res.send(err):res.send(row);
    }, true);
  });

  app.post('/notificaciones', (req, res) => {
    crud.insert(con, {
      insertInto: 'notificaciones',
      values: req.body
    }, false, true);
    res.send({ok: true});
  });

}