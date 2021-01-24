import * as React from 'react';
import { Page } from '../layouts/logged-in';
import { connect } from 'react-redux';
import Garden from '../utils/database/garden';
import { getGardens, updateGardens, setGardens } from '../actions/gardens';
import { Auth } from '../utils/user';
import Form from '../components/form';
import EntityCrud from '../components/entity-crud';
import { __ } from '../utils/lang';
import {  Redirect } from 'react-router-dom';
import { GARDEN_URL } from '../routes';

export interface GardensProps {
    gardens: Garden[];
    getGardens: Function;
    updateGardens: Function;
    setGardens: Function;
}

export interface GardensState {
}

class Gardens extends React.Component<GardensProps, GardensState> {

    private defaultGarden: Garden = {
        name: 'New Garden',
        width: 20,
        height: 20
    };

    constructor (props: GardensProps) {
        super(props);

        this.onGardenChange = this.onGardenChange.bind(this);
        this.onGardenListChange = this.onGardenListChange.bind(this);
    }

    componentDidMount () {
        const uid = Auth.currentUser().uid || null;
        this.props.getGardens(uid);
    }

    onGardenChange (evt: React.ChangeEvent<HTMLInputElement>, id: number, changed: keyof Garden) {
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

    onGardenListChange (gardens: Garden[]) {
        const uid = Auth.currentUser().uid || null;
        this.props.updateGardens(uid, gardens);
    }

    render () {
        let form = (id: number, garden: Garden) => <div>
            <Form.Group className="form__group">
                <label>
                    Name: 
                    <Form.Text name="name" value={garden.name} placeholder="Garden Name" onChange={(evt) => this.onGardenChange(evt, id, 'name')} />
                </label>
            </Form.Group>
            <Form.Group className="form__group">
                <label>
                    Width: 
                    <Form.Text name="width" value={garden.width} placeholder="Width" onChange={(evt) => this.onGardenChange(evt, id, 'width')} />
                </label>
            </Form.Group>
            <Form.Group className="form__group">
                <label>
                    Height: 
                    <Form.Text name="width" value={garden.height} placeholder="Height" onChange={(evt) => this.onGardenChange(evt, id, 'height')} />
                </label>
            </Form.Group>
            <div className="u-margin-top-small u-margin-bottom-small">
                <Form.Submit className="btn btn--secondary" value={__('Update Garden')} />
            </div>
        </div>;

        return <Page title="Gardens">
            <EntityCrud
                entityNameSingular="Garden"
                entityNamePlural="Gardens"
                entityDefaults={this.defaultGarden}
                editModal={form}
                viewComponent={(id: any, garden: Garden) => <Redirect to={GARDEN_URL.replace(/:id/, id + 1)}></Redirect>}
                onEntityChange={this.onGardenChange}
                onEntityListChange={this.onGardenListChange}
                entities={this.props.gardens || []}
                getName={(garden: Garden) => garden.name}
            />
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
        updateGardens: (uid: string, gardens: Garden[]) => dispatch(updateGardens(uid, gardens)),
        setGardens: (gardens: Garden[]) => dispatch(setGardens(gardens))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gardens);
