import * as React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import MockApp from '../mock-app';
import Register from '../../src/app/account/register';
import { Auth } from '../../src/app/utils/user';

describe('Register Page', () => {
    let container: HTMLElement = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        cleanup();
        container.remove();
        container = null;
    });

    test('Register should appear on the page', async () => {
        const { getByTestId } = render(<MockApp><Register/></MockApp>);
        const pageNode = await waitFor(() => getByTestId('page'));
        expect(pageNode.textContent).toMatch(/Register/);
    });

    test('Can fill in register form', async () => {
        const { getByTestId } = render(<MockApp><Register/></MockApp>);
        const form = await waitFor(() => getByTestId('form'));
        const email = await waitFor(() => getByTestId('email'));
        const password = await waitFor(() => getByTestId('password'));
        const confirmPassword = await waitFor(() => getByTestId('confirm-password'));

        fireEvent.change(email, {
            target: { value: 'email' }
        });
        fireEvent.change(password, {
            target: { value: 'password' }
        });
        fireEvent.change(confirmPassword, {
            target: { value: 'confirm password' }
        });

        expect(form).toHaveFormValues({
            email: 'email',
            password: 'password',
            'confirm-password': 'confirm password'
        });
    });

    test('Form can be submitted', async () => {
        const { getByTestId } = render(<MockApp><Register/></MockApp>);
        const form = await waitFor(() => getByTestId('form'));
        const email = await waitFor(() => getByTestId('email'));
        const password = await waitFor(() => getByTestId('password'));
        const confirmPassword = await waitFor(() => getByTestId('confirm-password'));

        fireEvent.change(email, {
            target: { value: 'test-register@stephenjames.dev' }
        });
        fireEvent.change(password, {
            target: { value: 'password' }
        });
        fireEvent.change(confirmPassword, {
            target: { value: 'password' }
        });

        fireEvent.submit(form);

        await new Promise((resolve) => setTimeout(() => resolve(true), 3000));

        expect(Auth.currentUser()).toBeTruthy();
        Auth.currentUser().delete();
    });
});