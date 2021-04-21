import * as React from 'react';
import Form from '../components/form';
import Modal from '../components/modal';
import Garden from '../utils/database/garden';

const { useState } = React;

export interface Props {
    onSubmit: any;
    onClose: Function;
    garden: Garden;
    title?: string;
}

const Settings = (props: Props) => {
    const [ garden, setGarden ] = useState<Garden>({ ...props.garden });

    const onGardenChange = (evt: React.ChangeEvent<HTMLInputElement>, key: keyof Garden): void => {
        const editedGarden = { ...garden };
        switch (key) {
            case 'width':
            case 'height':
                editedGarden[key] = parseInt(evt.target.value);
                break;
            case 'cells':
                // You can not edit cells in this way
                break;
            case 'name':
            default:
                editedGarden[key] = evt.target.value;
                break;
        }

        setGarden(editedGarden);
    };

    return <Modal title="Settings" cancel="Cancel" submit={props.title || 'Update Garden'} onSubmit={() => props.onSubmit(garden)} onClose={props.onClose}>
        <Form className="px-4 py-5 space-y-6 sm:p-6">
            <div className="grid grid-cols-4 gap-6">
                <Form.Group className="col-span-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <div className="mt-1">
                        <Form.Text
                            className="px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border"
                            name="name"
                            value={garden.name}
                            placeholder="Garden Name"
                            onChange={(evt) => onGardenChange(evt, 'name')}
                        />
                    </div>
                </Form.Group>
                <Form.Group className="col-span-4 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Width</label>
                    <div className="mt-1">
                        <Form.Text
                            className="px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border"
                            name="width"
                            value={garden.width}
                            placeholder="Width"
                            onChange={(evt) => onGardenChange(evt, 'width')}
                        />
                    </div>
                </Form.Group>
                <Form.Group className="col-span-4 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Height</label>
                    <div className="mt-1">
                        <Form.Text
                            className="px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border"
                            name="width"
                            value={garden.height}
                            placeholder="Height"
                            onChange={(evt) => onGardenChange(evt, 'height')}
                        />
                    </div>
                </Form.Group>
            </div>
        </Form>
    </Modal>;
}

export default Settings;
