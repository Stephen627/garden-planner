import * as React from 'react';
import { Page } from '../layouts/logged-in';
import { connect } from 'react-redux';
import Garden from '../utils/database/garden';
import { getGardens, updateGardens, setGardens } from '../actions/gardens';
import { Auth } from '../utils/user';
import List, { Item } from '../components/list';
import Form from '../components/form';

export interface GardensProps {
    gardens: Garden[];
    getGardens: Function;
    updateGardens: Function;
    setGardens: Function;
}

export interface GardensState {
    selectedGarden: number
}

class Gardens extends React.Component<GardensProps, GardensState> {

    constructor (props: GardensProps) {
        super(props);

        this.onGardenClick = this.onGardenClick.bind(this);
        this.onGardenEditSubmit = this.onGardenEditSubmit.bind(this);
        this.onGardenChange = this.onGardenChange.bind(this);

        this.state = {
            selectedGarden: null
        }
    }

    componentDidMount () {
        const uid = Auth.currentUser().uid || null;
        this.props.getGardens(uid);
    }

    onGardenClick (gardenId: number) {
        this.setState({
            ...this.state,
            selectedGarden: gardenId
        })
    }

    onGardenEditSubmit () {
        const uid = Auth.currentUser().uid || null;
        this.props.updateGardens(uid, this.props.gardens);
    }

    onGardenChange (evt: React.ChangeEvent<HTMLInputElement>, changed: keyof Garden) {
        const gardens = [ ...this.props.gardens ];
        gardens[this.state.selectedGarden][changed] = evt.target.value;

        this.props.setGardens(gardens);
    }

    render () {
        const gardens = this.props.gardens.map((item: Garden, id: number) => {
            return <Item onClick={() => this.onGardenClick(id)}>
                {item.name}
            </Item>
        });

        let form = <div></div>;
        
        if (this.state.selectedGarden !== null && this.state.selectedGarden >= 0) {
            const garden: Garden = this.props.gardens[this.state.selectedGarden];

            form = <Form onSubmit={this.onGardenEditSubmit}>
                <Form.Text name="name" value={garden.name} placeholder="Garden Name" onChange={(evt) => this.onGardenChange(evt, 'name')} />
                <Form.Submit value="Update Garden" />
            </Form>
        }

        return <Page>
            <h1>Gardens</h1>
            <p>Selected Garden: {this.state.selectedGarden}</p>
            <List>
                {gardens}
            </List>
            {this.state.selectedGarden !== null && form}
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
