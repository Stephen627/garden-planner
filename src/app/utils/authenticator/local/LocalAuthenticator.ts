import AuthenticatorInterface from '../authenticator-interface';
import User from '../user/user-interface';
import UserCredentials from '../user/user-credential-interface';


class FirebaseAuthenticator implements AuthenticatorInterface {
    private authenticated: boolean = false;
    private onAuthChangeFunc: Function = () => {};

    public onAuthChange (callback: any) {
        this.onAuthChangeFunc = callback;
    }

    public isAuthenticated (): boolean {
        return this.authenticated;
    }

    public currentUser (): User | null {
        return {
            uid: '',
            email: '',
            delete: () => { return new Promise(() => {})},
            updatePassword: (newPassword: string) => { return new Promise((resolve) => { resolve(); })}
        };
    }

    public authenticate (email: string, password: string): Promise<UserCredentials> {
        return new Promise((resolve) => {
            this.authenticated = true;
            this.onAuthChangeFunc({});
            resolve({});
        });
    }

    public register (email: string, password: string): Promise<UserCredentials> {
        return new Promise((resolve) => {
            this.authenticated = true;
            this.onAuthChangeFunc({});
            resolve({});
        });
    }

    public signout (): Promise<void> {
        return new Promise((resolve) => {
            this.authenticated = false;
            this.onAuthChangeFunc({});
            resolve();
        });
    }
}

export default FirebaseAuthenticator;
