import * as React from 'react';
import { connect } from 'react-redux';

import { Page } from '../layouts/logged-in';
import GardenModel from '../utils/database/garden';
import { getGardens, updateGardens, setGardens } from '../actions/gardens';
import { Auth } from '../utils/user';
import Loading from './loading';
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
        };
    }

    componentDidMount () {
        const uid = Auth.currentUser().uid || null;
        this.props.getGardens(uid);
    }

    onSettingsSubmit () {
        const uid = Auth.currentUser().uid || null;
        this.props.updateGardens(uid, this.props.gardens);
        this.setState({
            ...this.state,
            showSettings: false
        })
    }

    onGardenChange (evt: React.ChangeEvent<HTMLInputElement>, id: number, changed: keyof GardenModel) {
        const gardens = [ ...this.props.gardens ];

        switch (changed) {
            case 'width':
            case 'height':
                gardens[id][changed] = parseInt(evt.target.value);
                break;
            default:
                gardens[id][changed] = evt.target.value
                break;
        }

        this.props.setGardens(gardens);
    }

    render () {
        if (!this.props.gardens.length) {
            return <Loading></Loading>
        }

        const garden: GardenModel = this.props.gardens[this.id];

        let form = <Modal title="Settings" onClose={() => this.setState({ ...this.state, showSettings: false })}>
            <Form onSubmit={this.onSettingsSubmit} className="form">
                <Form.Group className="form__group">
                    <label>
                        Name: 
                        <Form.Text name="name" value={garden.name} placeholder="Garden Name" onChange={(evt) => this.onGardenChange(evt, this.id, 'name')} />
                    </label>
                </Form.Group>
                <Form.Group className="form__group">
                    <label>
                        Width: 
                        <Form.Text name="width" value={garden.width} placeholder="Width" onChange={(evt) => this.onGardenChange(evt, this.id, 'width')} />
                    </label>
                </Form.Group>
                <Form.Group className="form__group">
                    <label>
                        Height: 
                        <Form.Text name="width" value={garden.height} placeholder="Height" onChange={(evt) => this.onGardenChange(evt, this.id, 'height')} />
                    </label>
                </Form.Group>
                <div className="u-margin-top-small u-margin-bottom-small">
                    <Form.Submit className="btn btn--secondary" value={__('Update Garden')} />
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
