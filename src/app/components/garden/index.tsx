import * as React from 'react';

import GardenModel from '../../utils/database/garden';
import { GardenGrid, GardenGridProps } from './grid';

export interface GardenProps {
    entity: GardenModel;
}

export interface GardenState {
}

class Garden extends React.Component<GardenProps, GardenState> {

    render () {
        const { entity } = this.props;
        const gardenGridProps: GardenGridProps = {
            width: entity.width,
            height: entity.height
        }

        return <div className="garden">
            <GardenGrid {...gardenGridProps}></GardenGrid>
        </div>;
    }
}

export default Garden;
