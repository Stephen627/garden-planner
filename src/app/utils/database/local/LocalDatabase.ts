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
        return new Promise(async (resolve) => {
            const formattedRef = this.formatRef(ref);
            if (formattedRef.indexOf('/') === -1) {
                localStorage.setItem(
                    this.formatRef(ref),
                    JSON.stringify(data)
                );
                resolve(true);
                return;
            }

            const parts = formattedRef.slice(formattedRef.indexOf('/') + 1).split('/');
            const baseRef = formattedRef.slice(0, formattedRef.indexOf('/'));
            const currentData: any = await this.get(baseRef);
            let newData: any = currentData;

            for (let i = 0; i < parts.length - 1; i++) {
                const elem = parts[i];
                if (!newData[elem]) {
                    newData[elem] = {};
                }

                newData = newData[elem];
            }

            newData[parts[parts.length - 1]] = data;

            this.set(baseRef, currentData);

            resolve(true);
        });
    }

    public remove (ref: string): Promise<any> {
        return new Promise(() => {
            localStorage.removeItem(this.formatRef(ref));
        });
    }

    private formatRef (ref: string): string {
        if (ref.indexOf('/') === 0) {
            return ref.slice(1);
        }
        return ref;
    }

    private generateUniqueKey (keys: string[]): string {
        let key: string = '';
        do {
            key = Math.random().toString(32).slice(2);
        } while (keys.indexOf(key) !== -1);

        return key;
    }

}

export default LocalDatabase;
