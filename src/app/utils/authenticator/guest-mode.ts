import { storage } from "../storage";
import config from "../config";
import LocalDatabase from "../database/local/LocalDatabase";
import { db } from "../db";
import LocalStorage from "../storage/local/LocalStorage";
import { Auth } from "../user";
import LocalAuthenticator from "./local/LocalAuthenticator";
import FirebaseDatabase from "../database/firebase/FirebaseDatabase";
import FirebaseStorage from "../storage/firebase/FirebaseStorage";
import FirebaseAuthenticator from "./firebase/FirebaseAuthenticator";

export const enableGuestMode = (): void => {
    config.set('auth_adapter', 'local');
    Auth.setAuthenticator(new LocalAuthenticator());
    config.set('db_adapter', 'local');
    db.setAdapter(new LocalDatabase());
    config.set('storage_adapter', 'local');
    storage.setAdapter(new LocalStorage());

    localStorage.setItem('guest_mode' , '1');
}

export const disableGuestMode = (): void => {
    config.set('auth_adapter', 'firebase');
    Auth.setAuthenticator(new FirebaseAuthenticator());
    config.set('db_adapter', 'firebase');
    db.setAdapter(new FirebaseDatabase());
    config.set('storage_adapter', 'firebase');
    storage.setAdapter(new FirebaseStorage());

    localStorage.setItem('guest_mode' , '0');
}
