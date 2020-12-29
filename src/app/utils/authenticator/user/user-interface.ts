export default interface User {
    readonly uid: string;
    delete: () => Promise<void>;
}