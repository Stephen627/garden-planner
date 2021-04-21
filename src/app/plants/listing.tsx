import * as React from 'react';
import { Page } from '../layouts/logged-in';
import EntityCrud from '../components/entity-crud';
import { getPlants, updatePlants, setPlants, addPlant } from './actions';
import { Auth } from '../utils/user';
import Plant from '../utils/database/plant';
import { connect } from 'react-redux';
import PlantView from './edit-modal';

export interface PlantsProps {
    plants: { [key: string]: Plant }
    getPlants: Function;
    updatePlants: Function;
    addPlant: Function;
    setPlants: Function;
}

export interface PlantsState {

}

class Plants extends React.Component<PlantsProps, PlantsState> {
    private defaultPlant: Plant = {
        name: 'New Plant',
        icon: '',
        hardiness: null,
    };

    constructor (props: PlantsProps) {
        super(props);

        this.onPlantListChange = this.onPlantListChange.bind(this);
        this.onPlantChange = this.onPlantChange.bind(this);
        this.onPlantAdd = this.onPlantAdd.bind(this);
    }

    componentDidMount () {
        const uid = Auth.currentUser().uid;
        this.props.getPlants(uid);
    }

    onPlantListChange (plants: {[key: string]: Plant}) {
        const uid = Auth.currentUser().uid;
        this.props.updatePlants(uid, plants);
    }

    onPlantChange (id: string, plant: Plant) {
        const plants = { ...this.props.plants };
        plants[id] = plant;

        this.onPlantListChange(plants);
    }

    onPlantAdd (plant: Plant) {
        const uid = Auth.currentUser().uid;
        this.props.addPlant(uid, plant);
    }

    render () {
        return <Page title="Plants">
            <EntityCrud
                entityNameSingular="Plant"
                entityNamePlural="Plants"
                entityDefaults={this.defaultPlant}
                viewString={ <span><i className="fas fa-pencil"></i> Edit</span> }
                viewComponent={(id: any, plant: Plant, close: any) => <PlantView id={id} plant={plant} onClose={close} onUpdate={(id: string, plant: Plant) => { this.onPlantChange(id, plant); close(); } }></PlantView>}
                onEntityListChange={this.onPlantListChange}
                onEntityAdd={this.onPlantAdd}
                entities={this.props.plants || {}}
                getName={(plant: Plant) => plant.name}
            >
            </EntityCrud>
        </Page>
    }
}

const mapStateToProps = (state: any) => {
    return {
        plants: state.plants.list
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getPlants: (uid: string) => dispatch(getPlants(uid)),
        updatePlants: (uid: string, plants: Plant[]) => dispatch(updatePlants(uid, plants)),
        addPlant: (uid: string, plant: Plant) => dispatch(addPlant(uid, plant)),
        setPlants: (plants: Plant[]) => dispatch(setPlants(plants))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plants);
