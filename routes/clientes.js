const sql  = require('sql-crud');
const crud = new sql("mysql");
module.exports = (app, con) => {
  app.get('/clientes', (req, res) => {
    crud.select(con, {
      select: '*',
      from: 'clientes'
    }, (err, row) => {
      err?res.send(err):res.send(row);
    }, true);
  });
}