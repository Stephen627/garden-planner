import * as firebase from 'firebase/app';
import 'firebase/auth';

import './firebase';

class Authenticator {
    protected handler: firebase.auth.Auth;
    private static instance: Authenticator;
    
    private constructor () {
        this.handler = firebase.auth();
        this.handler.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    }

    public onAuthChange (callback: any) {
        this.handler.onAuthStateChanged((user) => {
            callback(user);
            this.handler.updateCurrentUser(user);
        });
    }

    public isAuthenticated () {
        return !!this.handler.currentUser;
    }

    public user (): firebase.User {
        return this.handler.currentUser;
    }

    public authenticate (email: string, password: string): Promise<firebase.auth.UserCredential> {
        return this.handler.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            return this.handler.signInWithEmailAndPassword(email, password);
        })
    }

    public register (email: string, password: string): Promise<firebase.auth.UserCredential> {
        return this.handler.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            return this.handler.createUserWithEmailAndPassword(email, password);
        });
    }

    public signout (): Promise<void> {
        return this.handler.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            return this.handler.signOut();
        });
    }

    public static getInstance (): Authenticator {
        if (!Authenticator.instance) {
            Authenticator.instance = new Authenticator();
        }

        return Authenticator.instance;
    }
}

export const Auth = Authenticator.getInstance();
