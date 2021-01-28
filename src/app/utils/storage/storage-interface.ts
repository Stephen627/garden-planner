
interface StorageInterface {
    set (ref: string, file: any, metadata: any): Promise<any>;
    get (ref: string): Promise<string>;
    remove (ref: string): Promise<boolean>;
}

export default StorageInterface;
