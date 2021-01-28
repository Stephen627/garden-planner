
import Storage from './storage/index';
import FirebaseAdapter from './storage/firebase/FirebaseStorage';

const firebaseAdapter = new FirebaseAdapter();
const storage = new Storage();

storage.setAdapter(firebaseAdapter);

export {
    storage
};
