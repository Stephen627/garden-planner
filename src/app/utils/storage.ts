
import Storage from './storage/index';
import FirebaseAdapter from './storage/firebase/FirebaseStorage';
import LocalAdapter from './storage/local/LocalStorage';
import Config from './config';

const storage = new Storage();

switch (Config.get('storage_adapter')) {
    case 'local':
        const localAdapater = new LocalAdapter();
        storage.setAdapter(localAdapater);
    case 'firebase':
    default:
        const firebaseAdapter = new FirebaseAdapter();
        storage.setAdapter(firebaseAdapter);
        break;
}

export {
    storage
};
