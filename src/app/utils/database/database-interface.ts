
interface DatabaseInterface {
    set (ref: string, data: any): Promise<any>;
    get (ref: string): Promise<any>;
}

export default DatabaseInterface;
