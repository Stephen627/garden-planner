import { Config } from "./config";

class PromiseKeeper extends Config {
    protected data: { [key: string]: Promise<any> } = {};

    public set (key: string, value: Promise<any>): void {
        super.set(key, value);
    }

    public get (key: string): Promise<any> {
        return super.get(key);
    }
}

export default PromiseKeeper.getInstance();
