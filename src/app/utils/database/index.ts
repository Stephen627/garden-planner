
import DatabaseInterface from './database-interface';

class Database {
    private adapter: DatabaseInterface;

    public setAdapter (adapater: DatabaseInterface) {
        this.adapter = adapater;
    }

    public get (ref: string): any {
        return this.adapter.get(ref);
    }

    public set (ref: string, data: any): Promise<any> {
        return this.adapter.set(ref, data);
    }
}

export default Database;
