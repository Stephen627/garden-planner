import * as firebase from 'firebase/app';
import 'firebase/auth';

import '../../firebase';
import AuthenticatorInterface from '../authenticator-interface';
import FirebaseUser from './user';
import FirebaseUserCredentials from './user-credentials';


class FirebaseAuthenticator implements AuthenticatorInterface {
    protected handler: firebase.auth.Auth;
    
    public constructor () {
        this.handler = firebase.auth();
        this.handler.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    }

    public onAuthChange (callback: any) {
        this.handler.onAuthStateChanged((user) => {
            callback(user);
            this.handler.updateCurrentUser(user);
        });
    }

    public isAuthenticated (): boolean {
        return !!this.handler.currentUser;
    }

    public currentUser (): FirebaseUser | null {
        return this.convertUserCredentials(this.handler.currentUser);
    }

    public authenticate (email: string, password: string): Promise<FirebaseUserCredentials> {
        return this.handler.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            return this.handler.signInWithEmailAndPassword(email, password);
        })
    }

    public register (email: string, password: string): Promise<FirebaseUserCredentials> {
        return this.handler.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            return this.handler.createUserWithEmailAndPassword(email, password);
        });
    }

    public signout (): Promise<void> {
        return this.handler.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            return this.handler.signOut();
        });
    }

    private convertUserCredentials (user: firebase.User): FirebaseUser {
        return user as FirebaseUser;
    }
}

export default FirebaseAuthenticator;
