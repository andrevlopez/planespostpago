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

  app.get('/planes', (req, res) => {
    crud.select(con, {
      select: '*',
      from: 'planesYtelefonias'
    }, (err, row) => {
      if (err) {
        res.send(err);
      }
      res.send(row);
    }, true );
  });

  app.delete('/planes', (req, res) => {
    crud.delete(con, {
      from: 'planesYtelefonias',
      where: {id:req.body.id}
    }, (err, row) => {
      if (err) {
        res.send(err);
      }
      res.send(row);
    }, true );
  });

  app.put('/planes', (req, res) => {
    crud.update(con, {
      table: 'planesYtelefonias',
      where: {id:req.body.id},
      values: req.body
    }, (err, row) => {
      if (err) {
        res.send(err);
      }
      res.send(row);
    }, true );
  });
}