const Hapi = require('hapi');
const Socket = require('socket.io');

const { routes, firebase } = require('./core');

const Server = Hapi.Server({
  host: 'localhost',
  port: 8080,
});

global.db = firebase.database();

const io = Socket(Server.listener);

let user = [];
io.sockets.on('connection', (client) => {
  const { id } = client; // get unik id

  // send first connect
  client.emit('news', { id, data: user });

  // register
  client.on('register', (data) => {
    console.log('this register : ', data)
    user.push(data);
    console.log('user : ', user);
  });

  // send message
  client.on('send', data => client.emit('message', data));

  // if client disconnect
  client.on('disconnect', () => {
    user = user.filter(obj => obj.id === id);
  });

});

Server.route(routes);

async function start() {
  try {
    await Server.start();
    /* eslint no-console: ["error", { allow: ["log"] }] */
    console.log('server running at', Server.info.uri);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
