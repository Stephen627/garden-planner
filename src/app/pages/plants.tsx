import * as React from 'react';
import { Page } from '../layouts/logged-in';
import EntityCrud from '../components/entity-crud';

export interface PlantsProps {

}

export interface PlantsState {

}

const viewComponent = () => <div></div>;

class Plants extends React.Component<PlantsProps, PlantsState> {

    constructor (props: PlantsProps) {
        super(props);

        this.onPlantChange = this.onPlantChange.bind(this);
        this.onPlantListChange = this.onPlantListChange.bind(this);
    }

    onPlantChange (evt: React.ChangeEvent<HTMLInputElement>) {

    }

    onPlantListChange (plants: any[]) {

    }

    render () {
        return <Page title="Plants">
            <EntityCrud
                entityNameSingular="Plant"
                entityNamePlural="Plants"
                entityDefaults={{}}
                editModal={<div></div>}
                viewComponent={(id: any, plant: any) => viewComponent}
                onEntityChange={this.onPlantChange}
                onEntityListChange={this.onPlantListChange}
                entities={[]}
                getName={(plant: any) => 'test'}
            >
            </EntityCrud>
        </Page>
    }
}

export default Plants;
