import { Auth } from '../../src/app/utils/user';

describe('User auth', () => {
    beforeAll(async () => {
        await Auth.register('test1@stephenjames.dev', 'test123');
        Auth.signout();
    });

    test('By default, the user is not authenticated', () => {
        expect(Auth.isAuthenticated()).toBeFalsy();
    });

    test('By default, the current user should return null', () => {
        expect(Auth.currentUser()).toBeFalsy();
    });
    
    test('User can register', async () => {
        const user = await Auth.register('test123@stephenjames.dev', 'test123');
        expect(user).toBeTruthy();
        Auth.currentUser().delete();
    });

    test('User can login', async () => {
        await Auth.authenticate('test1@stephenjames.dev', 'test123');
        expect(await Auth.currentUser()).toBeTruthy();
    });

    test('onAuthChange is called after the user auth has changed', async () => {
        const onAuthChange = jest.fn();
        Auth.onAuthChange(onAuthChange);

        await Auth.authenticate('test1@stephenjames.dev', 'test123');

        expect(onAuthChange).toBeCalled();
    });

    test('User is not accessible after signout', async () => {
        await Auth.authenticate('test1@stephenjames.dev', 'test123');
        expect(await Auth.currentUser()).toBeTruthy();
        await Auth.signout();
        expect(await Auth.currentUser()).toBeFalsy();
    })

    afterAll(async () => {
        await Auth.authenticate('test1@stephenjames.dev', 'test123');
        await Auth.currentUser().delete();
    });
    afterEach(async () => {
        try {
            await Auth.signout();
        } catch (err) {}
    });
});