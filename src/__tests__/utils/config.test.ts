const { default: config, Config } = require('../../app/utils/config');

describe('Config object', () => {
    beforeEach(() => {
        config.wipe();
    });

    test('Config default export should return an instance of the config object', () => {
        expect(config).toBeInstanceOf(Config);
    });

    test('Config getInstance should return an instance of the config object', () => {
        expect(Config.getInstance()).toBeInstanceOf(Config);
    });

    test('Can set a value on the config object', () => {
        config.set('testKey', 'testValue');
        expect(config.get('testKey')).toBe('testValue');
    });

    test('Can set a value using dots to seperate objects', () => {
        config.set('testKey.subKey', 'testValue');
        expect(JSON.stringify(config.get('testKey'))).toBe(JSON.stringify({
            subKey: 'testValue'
        }));
    });

    test('Can get value at base level', () => {
        config.set('yetAnotherTestKey', 'yetAnotherTestValue');
        expect(config.get('yetAnotherTestKey')).toBe('yetAnotherTestValue');
    });

    test('Can get valyes using dots to seperate objects', () => {
        config.set('yetAnotherTestKey.yetAnotherSubKey', 'yetAnotherTestValue');
        expect(JSON.stringify(config.get('yetAnotherTestKey'))).toBe(JSON.stringify({
            yetAnotherSubKey: 'yetAnotherTestValue'
        }));
        expect(config.get('yetAnotherTestKey.yetAnotherSubKey')).toBe('yetAnotherTestValue');
    });

    test('Setting a value to another value overrides it', () => {
        config.set('key', 'value');
        expect(config.get('key')).toBe('value');
        config.set('key.subKey', 'value');
        expect(JSON.stringify(config.get('key'))).toBe(JSON.stringify({
            subKey: 'value'
        }));
    });

    test('Setting a new key on the same level doesn\'t wipe the whole level', () => {
        config.set('key.subKey', 'value1');
        expect(config.get('key.subKey')).toBe('value1');
        config.set('key.subKey2', 'value2');
        expect(config.get('key.subKey')).toBe('value1');
        expect(config.get('key.subKey2')).toBe('value2');

        config.set('key.subKey2', 'value3');
        expect(config.get('key.subKey2')).toBe('value3');
    });
    
    test('Wiping the config removes all data from it', () => {
        config.set('key', 'value');
        expect(config.get('key')).toBe('value');
        config.wipe();
        expect(config.get('key')).toBeFalsy();
    });
});
