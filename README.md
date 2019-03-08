# Synchronize video across devices

Node server and react app to synchronize video across devices.

After cloning the repo, run  `yarn`.

In `src/api.js`, update `const socket = openSocket('http://10.1.17.188:8000');` to your computer's address on the local netowrk. (When you yarn start the react app, it gives you this url.)

Run `node server.js` to start the socket.io server.

Run `yarn start` to run the react app.

Then, you can visit the url from any device on the local network. The controller should be subscribed first, then any number of displays can be added.

Click "Sync Video" button to restart all the videos simultaneously.
