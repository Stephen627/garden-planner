export default interface User {
    readonly uid: string;
    readonly email: string;
    delete: () => Promise<void>;
    updatePassword: (newPassword: string) => Promise<void>;
}