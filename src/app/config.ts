
const config = require('../../config.json');

class Config {
    private static instance: Config;
    protected data: any;

    private constructor () {
        this.data = config;
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

    static getInstance (): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }

        return Config.instance;
    }
}

export default Config.getInstance();
