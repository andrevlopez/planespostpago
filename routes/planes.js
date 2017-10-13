const sql  = require('sql-crud');
const crud = new sql("mysql");
module.exports = (app, con) => {
  app.post('/nuevoPlan', (req, res) => {
    crud.insert(con, {
      insertInto: 'planesYtelefonias',
      values: req.body
    }, (err, row) => {
      if (err) {
        res.send({error: err});
      }
      res.send(row);
    }, true);
  });
}