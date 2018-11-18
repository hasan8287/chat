
const admin = require('firebase-admin');

const serviceAccount = require('./../../credential/firebase');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chat-89e6b.firebaseio.com',
});

module.exports = admin;
