import DatabaseInterface from '../database-interface';

class LocalDatabase implements DatabaseInterface {

    public get (ref: string): Promise<any> {
        return new Promise(() => {});
    }

    public push (ref: string, data: any): Promise<string> {
        return new Promise(() => {});
    }

    public set (ref: string, data: any): Promise<any> {
        return new Promise(() => {});
    }

    public remove (ref: string): Promise<any> {
        return new Promise(() => {});
    }

}

export default LocalDatabase;
