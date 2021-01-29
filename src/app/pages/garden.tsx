import * as React from 'react';
import { connect } from 'react-redux';

import { Page } from '../layouts/logged-in';
import GardenModel from '../utils/database/garden';
import { getGardens, updateGardens, setGardens } from '../actions/gardens';
import { Auth } from '../utils/user';
import Loading from '../components/loading';
import GardenGrid from '../components/garden';
import Form from '../components/form';
import { __ } from '../utils/lang';
import Modal from '../components/modal';
import Action from '../components/action';

export interface GardenProps {
    match: { params: { id: string } };
    gardens: GardenModel[];
    getGardens: Function;
    updateGardens: Function;
    setGardens: Function;
}

export interface GardenState {
    showSettings: boolean;
    editedGarden: GardenModel;
}

class Garden extends React.Component<GardenProps, GardenState> {

    private id: number;

    constructor (props: GardenProps) {
        super(props);

        this.id = parseInt(this.props.match.params.id) - 1;

        this.onGardenChange = this.onGardenChange.bind(this);
        this.onSettingsSubmit = this.onSettingsSubmit.bind(this);
        
        this.state = {
            showSettings: false,
            editedGarden: props.gardens[this.id]
        };
    }

    componentDidMount () {
        const uid = Auth.currentUser().uid || null;
        this.props.getGardens(uid);
    }

    onSettingsSubmit () {
        const uid = Auth.currentUser().uid || null;

        const gardens = this.props.gardens;
        gardens[this.id] = this.state.editedGarden;
        this.props.updateGardens(uid, gardens);
        this.setState({
            ...this.state,
            showSettings: false
        })
    }

    onGardenChange (evt: React.ChangeEvent<HTMLInputElement>, id: number, changed: keyof GardenModel) {
        const garden = { ...this.state.editedGarden };

        switch (changed) {
            case 'width':
            case 'height':
                garden[changed] = parseInt(evt.target.value);
                break;
            default:
                garden[changed] = evt.target.value
                break;
        }


        this.setState({
            ...this.state,
            editedGarden: garden
        });
    }

    render () {
        if (!this.props.gardens.length) {
            return <Loading></Loading>
        }

        const garden: GardenModel = this.props.gardens[this.id];

        let form = <Modal title="Settings" cancel="Cancel" submit="Update Garden" onSubmit={this.onSettingsSubmit} onClose={() => this.setState({ ...this.state, showSettings: false })}>
            <Form className="px-4 py-5 space-y-6 sm:p-6">
                <div className="grid grid-cols-4 gap-6">
                    <Form.Group className="col-span-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <div className="mt-1">
                            <Form.Text className="px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border" name="name" value={this.state.editedGarden.name} placeholder="Garden Name" onChange={(evt) => this.onGardenChange(evt, this.id, 'name')} />
                        </div>
                    </Form.Group>
                    <Form.Group className="col-span-4 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Width</label>
                        <div className="mt-1">
                            <Form.Text className="px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border" name="width" value={this.state.editedGarden.width} placeholder="Width" onChange={(evt) => this.onGardenChange(evt, this.id, 'width')} />
                        </div>
                    </Form.Group>
                    <Form.Group className="col-span-4 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Height</label>
                        <div className="mt-1">
                            <Form.Text className="px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border" name="width" value={this.state.editedGarden.height} placeholder="Height" onChange={(evt) => this.onGardenChange(evt, this.id, 'height')} />
                        </div>
                    </Form.Group>
                </div>
            </Form>
        </Modal>;

        return <Page title={garden.name}>
            <GardenGrid entity={garden}></GardenGrid>
            {this.state.showSettings && form}
            <Action onClick={() => this.setState({ ...this.state, showSettings: true })}>
                <i className="fal fa-cog"></i>
            </Action>
        </Page>
    }
}

const mapStateToProps = (state: any) => {
    return {
        gardens: state.garden.list
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getGardens: (uid: string) => dispatch(getGardens(uid)),
        updateGardens: (uid: string, gardens: GardenModel[]) => dispatch(updateGardens(uid, gardens)),
        setGardens: (gardens: GardenModel[]) => dispatch(setGardens(gardens))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Garden);
