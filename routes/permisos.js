const sql  = require('sql-crud');
const crud = new sql("mysql");
module.exports = (app, con) => {
  app.get('/permisos', (req, res) => {
    crud.select(con, {
      select: '*',
      from: 'permisos'
    }, (err, row) => {
      if (err) {
        res.send(err);
      }
      res.send(row);
    }, true );
  });

  app.post('/permisos', (req, res) => {
    crud.insert(con, {
      insertInto: 'permisos',
      values: req.body
    }, (err, row) => {
      if (err) {
        res.send(err);
      }
      res.send(row);
    }, true );
  });

  app.delete('/permisos', (req, res) => {
    crud.delete(con, {
      from: 'permisos',
      where: {id:req.body.id}
    }, (err, row) => {
      if (err) {
        res.send(err);
      }
      res.send(row);
    }, true );
  });
}