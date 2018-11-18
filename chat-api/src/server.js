const Hapi = require('hapi');

const { routes, firebase } = require('./core');

const Server = Hapi.Server({
  host: 'localhost',
  port: 8080,
});

global.db = firebase.database();

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
