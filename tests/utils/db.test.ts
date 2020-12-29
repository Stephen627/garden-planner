import { db } from '../../src/app/utils/db';

describe('DB', () => {
    test('Can set a value', async () => {
        await db.set('test1', 'value1');
        expect(await db.get('test1')).toBe('value1');
        await db.remove('test1');
    });

    test('Can set a value deeper that level one', async () => {
        await db.set('test1/subtest1', 'value1');
        expect(JSON.stringify(await db.get('test1'))).toBe(JSON.stringify({
            subtest1: 'value1'
        }));
        await db.remove('test1');
    });

    test('Getting a value that doesn\'t exist should return falsy', async () => {
        expect(await db.get('this doesn\'t exist')).toBeFalsy();
    });
});