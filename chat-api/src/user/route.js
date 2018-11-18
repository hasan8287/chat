
const Controller = require('./controller');

module.exports = [{
  // TODO:
  method: 'GET',
  path: '/user',
  handler: () => {
  },
}, {
  // insert data
  method: 'POST',
  path: '/user',
  handler: Controller.insertData,
}];
