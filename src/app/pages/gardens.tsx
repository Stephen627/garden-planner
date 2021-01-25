import * as React from 'react';
import { Page } from '../layouts/logged-in';
import { connect } from 'react-redux';
import Garden from '../utils/database/garden';
import { getGardens, updateGardens } from '../actions/gardens';
import { Auth } from '../utils/user';
import EntityCrud from '../components/entity-crud';
import { __ } from '../utils/lang';
import {  Redirect } from 'react-router-dom';
import { GARDEN_URL } from '../routes';

export interface GardensProps {
    gardens: Garden[];
    getGardens: Function;
    updateGardens: Function;
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
    }

    componentDidMount () {
        const uid = Auth.currentUser().uid || null;
        this.props.getGardens(uid);
    }

    onGardenListChange (gardens: Garden[]) {
        const uid = Auth.currentUser().uid || null;
        this.props.updateGardens(uid, gardens);
    }

    render () {
        return <Page title="Gardens">
            <EntityCrud
                entityNameSingular="Garden"
                entityNamePlural="Gardens"
                entityDefaults={this.defaultGarden}
                viewComponent={(id: any, garden: Garden) => <Redirect to={GARDEN_URL.replace(/:id/, id + 1)}></Redirect>}
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gardens);
