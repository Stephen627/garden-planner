import DatabaseInterface from '../database-interface';

class LocalDatabase implements DatabaseInterface {

    public get (ref: string): Promise<any> {
        return new Promise((resolve) => {
            const data = localStorage.getItem(this.formatRef(ref));
            resolve(JSON.parse(data));
        });
    }

    public push (ref: string, data: any): Promise<string> {
        return new Promise(async (resolve) => {
            const currentData = await this.get(ref);
            const key = this.generateUniqueKey(currentData !== null ? Object.keys(currentData) : []);

            const newData = {
                ...currentData,
            };
            newData[key] = data;

            this.set(ref, newData);
            resolve(key);
        });
    }

    public set (ref: string, data: any): Promise<any> {
        return new Promise((resolve) => {
            localStorage.setItem(
                this.formatRef(ref),
                JSON.stringify(data)
            );

            resolve(true);
        });
    }

    public remove (ref: string): Promise<any> {
        return new Promise(() => {
            localStorage.removeItem(this.formatRef(ref));
        });
    }

    private formatRef (ref: string): string {
        return ref.slice(1);
    }

    private generateUniqueKey (keys: string[]): string {
        let key: string = '';
        do {
            key = Math.random().toString(32);
        } while (keys.indexOf(key) !== -1);

        return key;
    }

}

export default LocalDatabase;
