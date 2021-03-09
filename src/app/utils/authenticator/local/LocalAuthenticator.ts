import AuthenticatorInterface from '../authenticator-interface';
import User from '../user/user-interface';
import UserCredentials from '../user/user-credential-interface';


class FirebaseAuthenticator implements AuthenticatorInterface {
    private onAuthChangeFunc: Function = () => {};

    public onAuthChange (callback: any) {
        this.onAuthChangeFunc = callback;

        callback();
    }

    public isAuthenticated (): boolean {
        return localStorage.getItem('authenticated') === '1';
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
            this.setAuthenticated(true);
            this.onAuthChangeFunc({});
            resolve({});
        });
    }

    public register (email: string, password: string): Promise<UserCredentials> {
        return new Promise((resolve) => {
            this.setAuthenticated(true);
            this.onAuthChangeFunc({});
            resolve({});
        });
    }

    public signout (): Promise<void> {
        return new Promise((resolve) => {
            this.setAuthenticated(false);
            this.onAuthChangeFunc({});
            resolve();
        });
    }

    private setAuthenticated (authenticated: boolean): void {
        localStorage.setItem('authenticated', authenticated ? '1' : '0');
    }
}

export default FirebaseAuthenticator;
