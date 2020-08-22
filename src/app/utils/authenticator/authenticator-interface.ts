import UserInterface from './user/user-interface';
import UserCredentialsInterface from './user/user-credential-interface';

export default interface Authenicator {
    isAuthenticated(): boolean;
    currentUser(): UserInterface;
    authenticate(email: string, password: string): Promise<UserCredentialsInterface>;
    register(email: string, password: string): Promise<UserCredentialsInterface>;
    signout(): Promise<void>;
    onAuthChange(callback: any): void;
}