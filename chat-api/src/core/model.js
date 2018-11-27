const uuid = require('uuid/v1');
const firebase = require('./firebase');

const db = firebase.database();

class ModelFirebase {
  constructor(refRoot) {
    this.refRoot = refRoot;
  }

  insert(data) {
    const id = uuid();
    return db.ref(`${this.refRoot}/${id}`)
      .set(data, (error) => {
        if (error) return error;
        return Object.assign(data, { id });
      });
  }

  update(data, id) {
    return db.ref(`${this.refRoot}/${id}`)
      .set(data, (error) => {
        if (error) return error;
        return Object.assign(data, { id });
      });
  }
}

module.exports = ModelFirebase;
