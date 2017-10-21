module.exports = io => {
  io.on('connection', client => {
  	console.log('Client connected');
    console.log(client);
  });
}  