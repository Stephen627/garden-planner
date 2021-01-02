import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { 
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';
import { render, cleanup, waitFor } from '@testing-library/react';

import Garden, { GardenProps } from '../../src/app/pages/garden';
import { db } from '../../src/app/utils/db';
import reducers from '../../src/app/reducers';
import { Auth } from '../../src/app/utils/user';

describe('View Garden Page', () => {
    let container: HTMLElement = null;
    let fakeUserId: string = null;
    const mockStore = createStore(reducers, applyMiddleware(thunk));
    const fakeGardens = [
        {
            height: 20,
            width: 20,
            name: 'Test Garden 1'
        }
    ];
    const generateProps = (id: string): GardenProps => {
        return {
            match: {
                params: {
                    id: id
                }
            },
            getGardens: () => {},
            updateGardens: () => {},
            setGardens: () => {},
            gardens: fakeGardens
        };
    }

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        cleanup();
        container.remove();
        container = null;
    });

    beforeAll(async () => {
        await Auth.register('test-garden@stephenjames.dev', 'test123');
        fakeUserId = Auth.currentUser().uid;
        db.set(`gardens/${fakeUserId}`, fakeGardens);
    });

    afterAll(async () => {
        await Auth.currentUser().delete();
        db.remove(`gardens/${fakeUserId}`);
    });

    test('The garden name should appear on the page', async () => {
        await Auth.authenticate('test-garden@stephenjames.dev', 'test123');

        const { getByTestId } = render(<Provider store={mockStore}><Router><Garden { ...generateProps('1') } /></Router></Provider>);
        const pageNode = await waitFor(() => getByTestId('page'));
        expect(pageNode.textContent).toMatch(/Test Garden 1/);
    });
});