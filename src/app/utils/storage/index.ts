
import StorageInterface from './storage-interface';

class Storage {
    private adapter: StorageInterface;

    public setAdapter (adapater: StorageInterface) {
        this.adapter = adapater;
    }

    public get (ref: string): Promise<string> {
        return this.adapter.get(ref);
    }

    public set (ref: string, data: any, metadata: any = {}): Promise<any> {
        return this.adapter.set(ref, data, metadata);
    }

    public remove (ref: string): Promise<any> {
        return this.adapter.remove(ref);
    }
}

export default Storage;
