import * as React from 'react';
import Plant from '../../utils/database/plant';
import Modal from '../modal';
import Form from '../form';
import { storage } from '../../utils/storage';
import { Auth } from '../../utils/user';
import PromiseImage from '../promise-image';

export interface PlantViewProps {
    id: number;
    plant: Plant;
    onClose: Function;
    onUpdate: Function;
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

    onPlantChange (evt: React.ChangeEvent<HTMLInputElement>, key: keyof Plant) {
        const plant = { ...this.state.plant };
        plant[key] = evt.target.value;

        this.setState({
            ...this.state,
            plant
        });
    }

    async onUpdate () {
        const uid = Auth.currentUser().uid || null;
        const file = this.state.file;

        const filename = Math.random().toString(36);
        await storage.set(`${uid}/${filename}`, file);

        if (this.state.plant.icon) {
            storage.remove(`${uid}/${this.state.plant.icon}`);
        }

        const plant = { ...this.state.plant };
        plant.icon = filename;
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

        const uid = Auth.currentUser().uid || null;
        return storage.get(`${uid}/${url}`);
    }

    render () {
        return <Modal title="Edit Plant" submit="Update Plant" cancel="Cancel" onSubmit={this.onUpdate} onClose={this.props.onClose}>
        <Form className="px-4 py-5 space-y-6 sm:p-6">
            <div className="grid grid-cols-4 gap-6">
                <Form.Group className="col-span-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <div className="mt-1">
                        <Form.Text className="px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border" name="name" value={this.state.plant.name} placeholder="Plant Name" onChange={(evt) => { this.onPlantChange(evt, 'name'); }} />
                    </div>
                </Form.Group>
                <Form.Group className="col-span-4">
                    <label className="block text-sm font-medium text-gray-700">
                        { this.state.plant.icon && <PromiseImage className="inline-block w-20 mr-3" imagePromise={this.getImagePromise(this.state.plant.icon)} alt={this.state.plant.name} />}
                        <div className="inline-block px-3 py-2 w-max focus:ring-primary-500 focus:border-primary-500 rounded-md sm:text-sm border-gray-300 border cursor-pointer hover:bg-gray-100">
                            Upload an icon
                        </div>
                        <Form.FileUpload className="sr-only" name="icon" onChange={(evt) => { this.onFileUpload(evt) }} />
                    </label>
                </Form.Group>
            </div>
        </Form>
    </Modal>
    }
}

export default PlantView;
