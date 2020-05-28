import * as firebase from 'firebase';

export const Auth = {
    isAuthenticated: !!localStorage.getItem('user'),
    user (): firebase.User {
        return JSON.parse(localStorage.getItem('user'));
    },
    storeUser (user: firebase.User) {
        if (user === null) {
            localStorage.removeItem('user');
        } else {
            localStorage.setItem('user', JSON.stringify(user));
        }
    },
    authenticate (email: string, password: string): Promise<firebase.auth.UserCredential> {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    },
    register (email: string, password: string): Promise<firebase.auth.UserCredential> {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    },
    signout (): Promise<void> {
        Auth.storeUser(null);
        return firebase.auth().signOut();
    }
}