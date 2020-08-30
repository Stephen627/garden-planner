import * as firebase from 'firebase';
import DatabaseInterface from '../database-interface';

import '../../firebase';

const database = firebase.database();

class FirebaseDatabase implements DatabaseInterface {

    public get (ref: string): Promise<any> {
        return new Promise((resolve, reject) => {
            database.ref(ref).once('value').then(snapshot => {
                resolve(snapshot.val());
            }).catch(err => {
                reject(err);
            })
        });
    }

    public set (ref: string, data: any): void {
        database.ref(ref).set(data);
    }

}

export default FirebaseDatabase;
