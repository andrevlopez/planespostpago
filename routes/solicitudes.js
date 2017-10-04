const sql  = require('sql-crud');
const crud = new sql("mysql");
module.exports = (app, con) => {
  app.get('/solicitudes', (req, res) => {
    crud.select(con, {
      select: '*',
      from: 'solicitudes'
    }, (err, row) => {
      if (err) {
        res.send(err);
      }
      res.send(row);
    });
  });
}