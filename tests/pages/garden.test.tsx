import * as React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';

import Garden, { GardenProps } from '../../src/app/gardens/record';
import GardenModel from '../../src/app/utils/database/garden';
import { db } from '../../src/app/utils/db';
import { Auth } from '../../src/app/utils/user';
import MockApp from '../mock-app';

describe('View Garden Page', () => {
    let container: HTMLElement = null;
    let fakeUserId: string = null;
    const fakeGardens: { [key: string]: GardenModel} = {
        'test': {
            height: 20,
            width: 20,
            name: 'Test Garden 1',
            cells: null
        }
    };
    const generateProps = (id: string): GardenProps => {
        return {
            match: {
                params: {
                    id: id
                }
            },
            getGardens: () => {},
            getPlants: () => {},
            updateGardens: () => {},
            setGardens: () => {},
            updateCell: () => {},
            updateCells: () => {},
            gardens: fakeGardens,
            plants: {}
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
        db.set(`${fakeUserId}/gardens`, fakeGardens);
    });

    afterAll(async () => {
        await Auth.currentUser().delete();
        db.remove(`gardens/${fakeUserId}`);
    });

    test('The garden name should appear on the page', async () => {
        await Auth.authenticate('test-garden@stephenjames.dev', 'test123');

        const { getByTestId } = render(<MockApp><Garden { ...generateProps('1') } /></MockApp>);
        const pageNode = await waitFor(() => getByTestId('page'));
        expect(pageNode.textContent).toMatch(/Test Garden 1/);
    });
});