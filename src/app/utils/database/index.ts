
import DatabaseInterface from './database-interface';

class Database {
    private adapter: DatabaseInterface;

    public setAdapter (adapater: DatabaseInterface) {
        this.adapter = adapater;
    }

    public get (ref: string): Promise<any> {
        return this.adapter.get(ref);
    }

    public set (ref: string, data: any): Promise<any> {
        return this.adapter.set(ref, data);
    }

    public remove (ref: string): Promise<any> {
        return this.adapter.remove(ref);
    }

    public push (ref: string, data: any): Promise<string> {
        return this.adapter.push(ref, data);
    }
}

export default Database;
