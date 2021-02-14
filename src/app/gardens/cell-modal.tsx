import * as React from 'react';
import { CellContent } from './grid';
import Modal from '../components/modal';
import Form from '../components/form';
import Plant from '../utils/database/plant';
import { Option } from '../components/form/elements/select';

export interface Props {
    plants: { [key: string]: Plant };
    cell: CellContent;
    onUpdate: Function;
    onClose: Function;
}

export interface State {
    cell: CellContent
}

class CellModal extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);

        this.onCellValueChange = this.onCellValueChange.bind(this);

        this.state = {
            cell: props.cell
        };
    }

    onCellValueChange (evt: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>, key: keyof CellContent) {
        const cell = { ...this.state.cell };

        switch (key) {
            case 'plantData':
                // Plant data is not assignable this way
                break;
            case 'background':
            case 'plant':
            default:
                cell[key] = evt.target.value;
                break;
        }

        this.setState({
            ...this.state,
            cell
        });
    }

    render () {

        const options: Option[] = [];
        this.props.plants && Object.keys(this.props.plants).forEach((key: string) => {
            options.push({
                name: this.props.plants[key].name,
                value: key
            });
        });

        return <Modal title="Edit Cell" submit="Edit Cell" cancel="Cancel" onSubmit={() => this.props.onUpdate(this.state.cell)} onClose={this.props.onClose}>
            <Form className="px-4 py-5 space-y-6 sm:p-6">
                <div className="grid grid-cols-4 gap-6">
                    <Form.Group className="col-span-4">
                        <label className="block text-sm font-medium text-gray-700">Plant</label>
                        <div className="mt-1">
                            <Form.Select
                                className="px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border"
                                value={this.state.cell ? this.state.cell.plant : ''}
                                options={options}
                                onChange={(evt) => this.onCellValueChange(evt, 'plant')}
                                provideDefault={true}
                            />
                        </div>
                    </Form.Group>
                </div>
            </Form>
        </Modal>
    }
}

export default CellModal;
