import openSocket from 'socket.io-client';
// const socket = null;
const socket = openSocket('http://10.1.17.188:8000');

// function subscribeToTimer(cb) {
//   socket.on('timer', timestamp => cb(null, timestamp));
//   socket.emit('subscribeToTimer', 1000);
// }

function subscribeDisplay(data, updateCb, restartCb) {
  socket.emit('createDisplay', data);
  socket.on('displayUpdated', updateCb);
  socket.on('restartVideo', restartCb);
}

function subscribeController(newDisplayCb) {
  socket.on('newDisplayCreated', data => {
    newDisplayCb(data);
  });
}

function updateDisplay(data) {
  console.log('emitting updateDisplay', data);
  socket.emit('updateDisplay', data);
}
function sendSync() {
  socket.emit('syncVideo');
}

// function subscribePlane() {
//   console.log('subscribePlane');
//   const id = Date.now();
//   socket.emit('createUser', id);
//   return id;
// }
//
// function subscribeScene(createUserCallback, updateCallback) {
//   console.log('subscribe scene');
//
//   socket.on('newUser', id => {
//     console.log('client new user');
//     createUserCallback(id);
//   });
//
//   setTimeout(() => {
//     socket.on('updatePlane', (id, xy) => {
//       // console.log('client new user');
//       // console.log('updateplane', id, xy);
//       updateCallback(id, xy);
//     });
//   }, 1500);
// }
//
// function sendUpdate(id, x, y) {
//   // socket.on('timer', timestamp => cb(null, timestamp));
//   socket.emit('updatePosition', id, {
//     x,
//     y,
//   });
// }

export { subscribeDisplay, subscribeController, updateDisplay, sendSync };
