
import Database from './database';
import FirebaseAdapter from './database/firebase/database';

const firebaseAdapter = new FirebaseAdapter();
const db = new Database();

db.setAdapter(firebaseAdapter);

export {
    db
};
