import * as React from 'react';
import { Page } from '../layouts/logged-in';
import { connect } from 'react-redux';
import Garden from '../utils/database/garden';
import { getGardens } from '../actions/gardens';
import { Auth } from '../utils/user';
import List, { Item } from '../components/list';

export interface GardensProps {
    gardens: Garden[];
    getGardens: Function;
}

class Gardens extends React.Component<GardensProps> {

    componentDidMount () {
        const uid = Auth.currentUser().uid || null;
        this.props.getGardens(uid);
    }

    render () {
        const gardens = this.props.gardens.map((item: Garden) => {
            return <Item>
                {item.name}
            </Item>
        });

        return <Page>
            <h1>Gardens</h1>
            <List>
                {gardens}
            </List>
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
        getGardens: (uid: string) => dispatch(getGardens(uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gardens);
