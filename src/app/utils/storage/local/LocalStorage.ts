import StorageInterface from '../storage-interface';

class LocalStorage implements StorageInterface {

    public get (ref: string): Promise<string> {
        return new Promise((resolve) => {
            resolve(localStorage.getItem(this.formatRef(ref)));
        });
    }

    public set (ref: string, file: any, metadata: any): Promise<any> {
        return new Promise(async (resolve) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                localStorage.setItem(this.formatRef(ref), reader.result.toString());
                resolve(true);
            })
            reader.readAsDataURL(file);
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
}

export default LocalStorage;
