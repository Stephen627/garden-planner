import * as React from 'react';
import Plant from '../../utils/database/plant';
import Modal from '../modal';
import Form from '../form';

export interface PlantViewProps {
    id: number;
    plant: Plant;
    onClose: Function;
    onUpdate: Function;
}

export interface PlantViewState {
    plant: Plant;
}

class PlantView extends React.Component<PlantViewProps, PlantViewState> {
    constructor (props: PlantViewProps) {
        super(props);

        this.onPlantChange = this.onPlantChange.bind(this);

        this.state = {
            plant: props.plant
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

    render () {
        return <Modal title="Edit Plant" submit="Update Plant" cancel="Cancel" onSubmit={() => this.props.onUpdate(this.props.id, this.state.plant) } onClose={this.props.onClose}>
        <Form className="px-4 py-5 space-y-6 sm:p-6">
            <div className="grid grid-cols-4 gap-6">
                <Form.Group className="col-span-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <div className="mt-1">
                        <Form.Text className="px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border" name="name" value={this.state.plant.name} placeholder="Garden Name" onChange={(evt) => { this.onPlantChange(evt, 'name'); }} />
                    </div>
                </Form.Group>
            </div>
        </Form>
    </Modal>
    }
}

export default PlantView;
