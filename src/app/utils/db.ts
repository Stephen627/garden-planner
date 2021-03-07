
import Database from './database';
import FirebaseAdapter from './database/firebase/FirebaseDatabase';
import LocalAdapater from './database/local/LocalDatabase';
import Config from './config';

const db = new Database();

switch (Config.get('db_adapter')) {
    case 'local':
        const localAdapater = new LocalAdapater();
        db.setAdapter(localAdapater);
    case 'firebase':
    default:
        const firebaseAdapter = new FirebaseAdapter();
        db.setAdapter(firebaseAdapter);
        break;
}

export {
    db
};
