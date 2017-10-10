const sql  = require('sql-crud');
const crud = new sql("mysql");
module.exports = (app, con) => {
  app.post('/login', (req, res) => {
    crud.select(con, {
      select: '*',
      from: 'usuarios',
      where: {usuario: req.body.usuario, password: req.body.password}
    }, (err, row) => {
      if (err) {
        res.send(err);
      }
      row.length>0?res.send(true):res.send(false);
    });
  });

  app.post('/registroUsuario', (req, res) => {
    const query = `SELECT * FROM usuarios WHERE usuario = '${req.body.usuario}' OR email = '${req.body.email}';`
    con.query(query, (err, row) => {
       if (err) {
        res.send({error: err})
       }
       if (row.length > 0) {
          if(row.correo == req.body.email && row.usuario == req.body.usuario) {
            res.send({error: 'Correo y nombre de usuario estan registrados'});
          } else if (row.correo == req.body.email) {
            res.send({error: 'El correo ya esta registrado.'});
          } else {
            res.send({error: 'El nombre de usuario ya esta registrado.'});
          }
       } else {
          crud.insert(con, {
            insertInto: 'usuarios',
            values: req.body
          }, (err, row) => {
            if (err) {
              res.send(err);
            }
            res.send(row);
          }, true);
       }
    });
  });

  app.get('/usuarios', (req, res) => {
    crud.select(con, {
      select: '*',
      from: 'usuarios'
    }, (err, row) => {
      if (err) {
        res.send(err);
      }
      res.send(row);
    }, true );
  });

  app.post('/usuarios', (req, res) => {
    crud.insert(con, {
      insertInto: 'usuarios',
      values: req.body
    }, (err, row) => {
      if (err) {
        res.send(err);
      }
      res.send(row);
    }, true );
  });

  app.delete('/usuarios', (req, res) => {
    crud.delete(con, {
      from: 'usuarios',
      where: {id:req.body.id}
    }, (err, row) => {
      if (err) {
        res.send(err);
      }
      res.send(row);
    }, true );
  });

}