const io = require('socket.io')(3000);

const connectedDevices = {};

io.on('connection', (socket) => {
  console.log('New device connected:', socket.id);
  connectedDevices[socket.id] = true;

  socket.on('disconnect', () => {
    console.log('Device disconnected:', socket.id);
    delete connectedDevices[socket.id];
    io.emit('deviceList', Object.keys(connectedDevices));
  });

  socket.on('message', (message) => {
    console.log('Message received:', message);
    io.emit('message', message);
  });

  io.emit('deviceList', Object.keys(connectedDevices));
});
