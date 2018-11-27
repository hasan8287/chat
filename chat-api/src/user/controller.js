const Model = require('./model');


const userController = {};

userController.getData = () => {

};

userController.insertData = async (request, reply) => {
  try {
    await Model.insert({
      nama: 'fuad',
      set: 'hasan',
    });
    // console.log('request : ', request.payload)
    return reply.response({}).code(200);
  } catch (error) {
    return error;
  }
};

module.exports = userController;
