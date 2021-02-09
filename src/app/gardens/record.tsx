import * as React from 'react';
import { connect } from 'react-redux';

import { Page } from '../layouts/logged-in';
import GardenModel from '../utils/database/garden';
import { getGardens, updateGardens, setGardens } from './actions';
import { Auth } from '../utils/user';
import Loading from '../components/loading';
import GardenGrid from './grid';
import { __ } from '../utils/lang';
import Action from '../components/action';
import Settings from './settings';
import { db } from '../utils/db';

export interface GardenProps {
    match: { params: { id: string } };
    gardens: any;
    getGardens: Function;
    updateGardens: Function;
    setGardens: Function;
}

export interface GardenState {
    showSettings: boolean;
}

class Garden extends React.Component<GardenProps, GardenState> {

    private id: string;

    constructor (props: GardenProps) {
        super(props);

        this.id = this.props.match.params.id;
        this.onSettingsSubmit = this.onSettingsSubmit.bind(this);
        
        this.state = {
            showSettings: false,
        };
    }

    componentDidMount () {
        const uid = Auth.currentUser().uid || null;
        this.props.getGardens(uid);
    }

    onSettingsSubmit (garden: GardenModel) {
        const uid = Auth.currentUser().uid || null;

        const gardens = this.props.gardens;
        gardens[this.id] = garden;
        this.props.updateGardens(uid, gardens);
        this.setState({
            ...this.state,
            showSettings: false
        })
    }

    render () {
        if (this.props.gardens === null || !Object.keys(this.props.gardens).length) {
            return <Loading></Loading>
        }

        const garden = this.props.gardens[this.id];

        return <Page title={garden.name}>
            <GardenGrid width={garden.width} height={garden.height}></GardenGrid>
            {
                this.state.showSettings
                    && <Settings
                            garden={garden}
                            onSubmit={this.onSettingsSubmit}
                            onClose={() => this.setState({ ...this.state, showSettings: false})}
                        />
            }
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
