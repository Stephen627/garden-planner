import * as firebase from 'firebase/app';
import 'firebase/auth';

import '../../firebase';
import AuthenticatorInterface from '../authenticator-interface';
import FirebaseUser from '../user/user-interface';
import FirebaseUserCredentials from '../user/user-credential-interface';


class FirebaseAuthenticator implements AuthenticatorInterface {
    protected handler: firebase.auth.Auth;
    protected type: firebase.auth.Auth.Persistence;
    
    public constructor () {
        this.handler = firebase.auth();
        try {
            this.handler.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            this.type = firebase.auth.Auth.Persistence.LOCAL;
        } catch (err) {
            this.handler.setPersistence(firebase.auth.Auth.Persistence.NONE);
            this.type = firebase.auth.Auth.Persistence.NONE;
        }
    }

    public onAuthChange (callback: any) {
        this.handler.onAuthStateChanged((user) => {
            callback(user);
            if (user !== null) {
                this.handler.updateCurrentUser(user);
            }
        });
    }

    public isAuthenticated (): boolean {
        return !!this.handler.currentUser;
    }

    public currentUser (): FirebaseUser | null {
        return this.convertUserCredentials(this.handler.currentUser);
    }

    public authenticate (email: string, password: string): Promise<FirebaseUserCredentials> {
        return this.handler.setPersistence(this.type).then(() => {
            return this.handler.signInWithEmailAndPassword(email, password);
        })
    }

    public register (email: string, password: string): Promise<FirebaseUserCredentials> {
        return this.handler.setPersistence(this.type).then(() => {
            return this.handler.createUserWithEmailAndPassword(email, password);
        });
    }

    public signout (): Promise<void> {
        return this.handler.setPersistence(this.type).then(() => {
            return this.handler.signOut();
        });
    }

    private convertUserCredentials (user: firebase.User): FirebaseUser {
        return user as FirebaseUser;
    }
}

export default FirebaseAuthenticator;
