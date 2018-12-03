const uuid = require('uuid/v1');
const firebase = require('./firebase');

const db = firebase.database();

class ModelFirebase {
  constructor(refRoot) {
    this.refRoot = refRoot;
  }

  insert(data, idCustome = false) {
    const id = (idCustome) ? idCustome : uuid();
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

  getData() {
    return new Promise((resolve, reject) => {
      db.ref(this.refRoot).on('value', function (snapshot) {
        resolve(snapshot.val());
      }, function (errorObject) {
        reject(errorObject);
      })
    });
  }

  removeData(link) {
    return db.ref(`${this.refRoot}/${link}`).remove()
      .then(() => link )
      .catch(err => err);
  }
}

module.exports = ModelFirebase;
