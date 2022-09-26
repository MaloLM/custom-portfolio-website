import firebase from "../firebase";
import 'firebase/auth';

const db = firebase.database().ref("/pages");

class DatabaseService {
  getAll() {
    return db;
  }

  createAboutMe(data) {
    return db.push(data);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }

  async logIn( email, password ){
        const response = await firebase.auth().signInWithEmailAndPassword(email, password)
        if (response) {
          return true  
          } else {
            return false
          }
      }
}

export default new DatabaseService();