import * as React from 'react';

import Plant, { Hardiness, hardinessInfo } from '../utils/database/plant';
import Modal from '../components/modal';
import Form from '../components/form';
import { storage } from '../utils/storage';
import { Auth } from '../utils/user';
import PromiseImage from '../components/promise-image';
import MonthSelectors from './month-selectors';

export interface PlantViewProps {
    id: number;
    plant: Plant;
    onClose: Function;
    onUpdate: Function;
    title?: string;
}

export interface PlantViewState {
    plant: Plant;
    file: File;
}

class PlantView extends React.Component<PlantViewProps, PlantViewState> {
    constructor (props: PlantViewProps) {
        super(props);

        this.onPlantChange = this.onPlantChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.onUpdate = this.onUpdate.bind(this);

        this.state = {
            plant: props.plant,
            file: null
        }
    }

    onPlantChange (evt: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>|boolean[], key: keyof Plant) {
        const plant = { ...this.state.plant };

        switch (key) {
            case 'sow':
            case 'plantOut':
            case 'harvest':
                plant[key] = Array.isArray(evt) ? evt : plant[key];
                break;
            case 'hardiness':
                if (!Array.isArray(evt) && Object.keys(Hardiness).includes(evt.target.value)) {
                    plant[key] = evt.target.value;
                }
                break;
            default:
                plant[key] = Array.isArray(evt) ? plant[key] : evt.target.value;
                break;
        }

        this.setState({
            ...this.state,
            plant
        });
    }
    
    async onUpdate () {
        const uid = Auth.currentUser().uid;
        const file = this.state.file;
        const plant = { ...this.state.plant };

        if (file) {
            const filename = Math.random().toString(36);
            await storage.set(`${uid}/${filename}`, file);
        

            if (this.state.plant.icon) {
                storage.remove(`${uid}/${this.state.plant.icon}`);
            }

            plant.icon = filename;
        }
        
        this.setState({
            ...this.state,
            plant
        });

        this.props.onUpdate(this.props.id, this.state.plant);
    }

    async onFileUpload (evt: React.ChangeEvent<HTMLInputElement>) {
        if (typeof evt.target.files[0] === 'undefined') {
            return;
        }
        const file = evt.target.files[0];
        this.setState({
            ...this.state,
            file
        });
    }

    getImagePromise (url: string): Promise<string> {
        if (this.state.file) {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    resolve(reader.result.toString());
                }, false);
                reader.readAsDataURL(this.state.file);
            });
        }

        const uid = Auth.currentUser().uid;
        return storage.get(`${uid}/${url}`);
    }


    render () {
        const hardinessOptions = Object.keys(hardinessInfo).map((key: string) => {
            const option: any = hardinessInfo[key];
            return {
                name: `${option.temperature} (${key})`,
                value: key
            }
        });
        return <Modal x-wide title="Edit Plant" submit={this.props.title || 'Update Plant'} cancel="Cancel" onSubmit={this.onUpdate} onClose={this.props.onClose}>
            <Form className="px-4 py-5 space-y-6 sm:p-6">
                <div className="grid grid-cols-4 gap-6">
                    <Form.Group className="col-span-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <div className="mt-1">
                            <Form.Text className="px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border" name="name" value={this.state.plant.name} placeholder="Plant Name" onChange={(evt) => { this.onPlantChange(evt, 'name'); }} />
                        </div>
                    </Form.Group>
                    <Form.Group className="col-span-4">
                        <label className="block text-sm font-medium text-gray-700">Hardiness Zone</label>
                        <div className="mt-1">
                            <Form.Select
                                className="px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border"
                                value={this.state.plant.hardiness}
                                onChange={(evt) => { this.onPlantChange(evt, 'hardiness'); }}
                                options={hardinessOptions}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="col-span-4">
                        <label className="block text-sm font-medium text-gray-700">
                            { (this.state.plant.icon || this.state.file) && <PromiseImage className="inline-block w-20 mr-3" imagePromise={this.getImagePromise(this.state.plant.icon)} alt={this.state.plant.name} />}
                            <div className="inline-block px-3 py-2 w-max focus:ring-primary-500 focus:border-primary-500 rounded-md sm:text-sm border-gray-300 border cursor-pointer hover:bg-gray-100">
                                Upload an icon
                            </div>
                            <Form.FileUpload className="sr-only" name="icon" onChange={(evt) => { this.onFileUpload(evt) }} />
                        </label>
                    </Form.Group>
                    <Form.Group className="col-span-4">
                        <MonthSelectors
                            onChange={(name, values) => this.onPlantChange(values, name) }
                            sow={this.state.plant.sow || Array(12).fill(false)}
                            plantOut={this.state.plant.plantOut || Array(12).fill(false)}
                            harvest={this.state.plant.harvest || Array(12).fill(false)}
                        />
                    </Form.Group>
                </div>
            </Form>
        </Modal>
    }
}

export default PlantView;
