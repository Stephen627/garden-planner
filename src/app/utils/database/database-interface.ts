
interface DatabaseInterface {
    set (ref: string, data: any): Promise<any>;
    get (ref: string): Promise<any>;
    remove (ref: string): Promise<any>;
    push (ref: string, data:any): Promise<string>;
}

export default DatabaseInterface;
