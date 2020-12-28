
const config = require('../../../config.json');

class Config {
    private static instance: Config;
    protected data: any;

    private constructor () {
        this.data = config;
    }

    public set (key: string, value: any): void {
        if (key.indexOf('.') === -1) {
            this.data[key] = value;
            return;
        }

        const parts = key.split('.');
        let data = this.data;
        parts.forEach((part: string, index: number) => {
            if (typeof data[part] === 'undefined') {
                if (index === parts.length - 1) {
                    data[part] = value;
                } else {
                    data[part] = {};
                }
            } else {
                if (index === parts.length - 1) {
                    data[part] = value;
                } else if (typeof data[part] !== 'object') {
                    data[part] = {};
                }
            }

            data = data[part];
        });
    }

    public get (key: string): any {
        if (key.indexOf('.') === -1) {
            return this.data[key];
        }

        const parts = key.split('.');
        let value: any = false;
        parts.forEach((part: string) => {
            value = value ? value[part] : this.data[part];
        });

        return value;
    }

    public wipe (): void {
        this.data = {};
    }

    static getInstance (): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }

        return Config.instance;
    }
}

export {
    Config
}
export default Config.getInstance();
