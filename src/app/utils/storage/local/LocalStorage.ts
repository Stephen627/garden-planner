import StorageInterface from '../storage-interface';

class LocalStorage implements StorageInterface {

    public get (ref: string): Promise<string> {
        return new Promise(() => {});
    }

    public set (ref: string, file: any, metadata: any): Promise<any> {
        return new Promise(() => {});
    }

    public remove (ref: string): Promise<any> {
        return new Promise(() => {});
    }

}

export default LocalStorage;
