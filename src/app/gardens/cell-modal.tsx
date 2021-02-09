import * as React from 'react';
import { CellContent } from './grid';
import Modal from '../components/modal';
import Form from '../components/form';

export interface Props {
    cell: CellContent;
    onUpdate: Function;
    onClose: Function;
}

export interface State {

}

class CellModal extends React.Component<Props, State> {

    onCellValueChange (evt: React.ChangeEvent<HTMLInputElement>, key: keyof CellContent) {

    }

    render () {
        return <Modal title="Edit Cell" submit="Edit Cell" cancel="Cancel" onSubmit={this.props.onUpdate} onClose={this.props.onClose}>
            <Form className="px-4 py-5 space-y-6 sm:p-6">
                <div className="grid grid-cols-4 gap-6">
                    <Form.Group className="col-span-4">
                        <label className="block text-sm font-medium text-gray-700">Plant</label>
                        <div className="mt-1">
                            <Form.Text
                                className="px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border"
                                name="name"
                                value=""
                                placeholder="Plant"
                                onChange={(evt) => this.onCellValueChange(evt, 'plant')}
                            />
                        </div>
                    </Form.Group>
                </div>
            </Form>
        </Modal>
    }
}

export default CellModal;
