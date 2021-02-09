import * as React from 'react';
import { Page } from '../layouts/logged-in';
import { connect } from 'react-redux';
import Garden from '../utils/database/garden';
import { getGardens, updateGardens, addGarden } from './actions';
import { Auth } from '../utils/user';
import EntityCrud from '../components/entity-crud';
import { __ } from '../utils/lang';
import {  Redirect } from 'react-router-dom';
import { GARDEN_URL } from '../routes';

export interface GardensProps {
    gardens: Garden[];
    getGardens: Function;
    updateGardens: Function;
    addGarden: Function;
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

        this.onGardenListChange = this.onGardenListChange.bind(this);
        this.onGardenAdd = this.onGardenAdd.bind(this);
    }

    componentDidMount () {
        const uid = Auth.currentUser().uid || null;
        this.props.getGardens(uid);
    }

    onGardenListChange (gardens: Garden[]) {
        const uid = Auth.currentUser().uid || null;
        this.props.updateGardens(uid, gardens);
    }

    onGardenAdd (garden: Garden) {
        const uid = Auth.currentUser().uid;
        this.props.addGarden(uid, garden);
    }

    render () {
        return <Page title="Gardens">
            <EntityCrud
                entityNameSingular="Garden"
                entityNamePlural="Gardens"
                entityDefaults={this.defaultGarden}
                viewComponent={(id: any, garden: Garden) => <Redirect to={GARDEN_URL.replace(/:id/, id)}></Redirect>}
                onEntityListChange={this.onGardenListChange}
                onEntityAdd={this.onGardenAdd}
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
        addGarden: (uid: string, garden: Garden) => dispatch(addGarden(uid, garden)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gardens);
