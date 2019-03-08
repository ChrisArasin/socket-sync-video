const io = require('socket.io')();

io.on('connection', client => {
  client.on('createDisplay', data => {
    io.emit('newDisplayCreated', data);
  });

  client.on('updateDisplay', data => {
    io.emit('displayUpdated', data);
  });
  client.on('syncVideo', () => {
    io.emit('restartVideo');
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
