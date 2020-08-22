import UserInterface from './user/user-interface';
import UserCredentialsInterface from './user/user-credential-interface';
import AuthenticatorInterface from './authenticator-interface';

class Authenticator {
    protected authenticator: AuthenticatorInterface;

    public setAuthenticator (authenticator: AuthenticatorInterface) {
        this.authenticator = authenticator;
    }

    public onAuthChange (callback: any): void {
        this.authenticator.onAuthChange(callback);
    }

    public isAuthenticated (): boolean {
        return this.authenticator.isAuthenticated();
    }

    public currentUser (): UserInterface | null {
        return this.authenticator.currentUser();
    }

    public authenticate (email: string, password: string): Promise<UserCredentialsInterface> {
        return this.authenticator.authenticate(email, password);
    }

    public register (email: string, password: string): Promise<UserCredentialsInterface> {
        return this.authenticator.register(email, password);
    }

    public signout (): Promise<void> {
        return  this.authenticator.signout();
    }
}

export default Authenticator;
