import * as React from 'react';
import { Page } from '../layouts/logged-in';
import EntityCrud from '../components/entity-crud';
import { getPlants, updatePlants, setPlants } from '../actions/plants';
import { Auth } from '../utils/user';
import Plant from '../utils/database/plant';
import { connect } from 'react-redux';
import PlantView from '../components/plant/view';

export interface PlantsProps {
    plants: Plant[];
    getPlants: Function;
    updatePlants: Function;
    setPlants: Function;
}

export interface PlantsState {

}

class Plants extends React.Component<PlantsProps, PlantsState> {
    private defaultPlant: Plant = {
        name: 'New Plant',
    };

    constructor (props: PlantsProps) {
        super(props);

        this.onPlantListChange = this.onPlantListChange.bind(this);
        this.onPlantChange = this.onPlantChange.bind(this);
    }

    componentDidMount () {
        const uid = Auth.currentUser().uid || null;
        this.props.getPlants(uid);
    }

    onPlantListChange (plants: Plant[]) {
        const uid = Auth.currentUser().uid || null;
        this.props.updatePlants(uid, plants);
    }

    onPlantChange (id: number, plant: Plant) {
        const plants = [ ...this.props.plants ];
        plants[id] = plant;

        this.onPlantListChange(plants);
    }

    render () {
        return <Page title="Plants">
            <EntityCrud
                entityNameSingular="Plant"
                entityNamePlural="Plants"
                entityDefaults={this.defaultPlant}
                editModal={<div></div>}
                viewComponent={(id: any, plant: Plant, close: any) => <PlantView id={id} plant={plant} onClose={close} onUpdate={(id: number, plant: Plant) => { this.onPlantChange(id, plant); close(); } }></PlantView>}
                onEntityListChange={this.onPlantListChange}
                entities={this.props.plants || []}
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
        setPlants: (plants: Plant[]) => dispatch(setPlants(plants))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plants);
