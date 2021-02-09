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

    public push (ref: string, data: any): Promise<string> {
        return new Promise((resolve, reject) => {
            database.ref(ref).push(data).then(reference => {
                resolve(reference.key);
            }).catch(err => {
                reject(err);
            });
        });
    }

    public set (ref: string, data: any): Promise<any> {
        return database.ref(ref).set(data);
    }

    public remove (ref: string): Promise<any> {
        return database.ref(ref).remove();
    }

}

export default FirebaseDatabase;
