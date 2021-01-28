import * as firebase from 'firebase';
import StorageInterface from '../storage-interface';

import '../../firebase';

const storage = firebase.storage().ref();

class FirebaseStorage implements StorageInterface {

    public get (ref: string): Promise<string> {
        return storage.child(ref).getDownloadURL();
    }

    public set (ref: string, file: any, metadata: any): Promise<any> {
        return new Promise((resolve, reject) => {
            storage.child(ref).put(file, metadata).then(data => resolve(data)).catch(err => reject(err));
        });
    }

    public remove (ref: string): Promise<any> {
        return storage.child(ref).delete();
    }

}

export default FirebaseStorage;
