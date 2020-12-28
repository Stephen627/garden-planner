import { __ } from '../../src/app/utils/lang';

describe('Lang function', () => {
    test('Searching for a word not the lang file will return the value provided', () => {
        expect(__('this is a test phrase that doesn\'t exist')).toBe('this is a test phrase that doesn\'t exist');
    });

    test('Searching for a value that does exist should return something else', () => {
        expect(__('test phrase exists')).toBe('something else');
    });
});