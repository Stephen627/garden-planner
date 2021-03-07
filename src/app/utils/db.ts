
import Database from './database';
import FirebaseAdapter from './database/firebase/FirebaseDatabase';
import LocalAdapter from './database/local/LocalDatabase';
import Config from './config';

const db = new Database();

switch (Config.get('db_adapter')) {
    case 'local':
        const localAdapter = new LocalAdapter();
        db.setAdapter(localAdapter);
    case 'firebase':
    default:
        const firebaseAdapter = new FirebaseAdapter();
        db.setAdapter(firebaseAdapter);
        break;
}

export {
    db
};
