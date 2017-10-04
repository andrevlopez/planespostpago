module.exports = app => {
  app.get('/login', (req, res) => {
    res.render('../dist/limit/login.html');
  });
  app.get('/registroUsuario', (req, res) => {
    res.render('../dist/nuevo-usuario.html');
  });

  app.get('/lista-planes', (req, res) => {
    res.render('../dist/limit/lista-planes.html');
  });
}