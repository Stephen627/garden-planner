
interface DatabaseInterface {
    set (ref: string, data: any): void;
    get (ref: string): any;
}

export default DatabaseInterface;
