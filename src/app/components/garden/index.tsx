import * as React from 'react';

import { Settings, SettingsProps } from './settings';
import { GardenGrid, GardenGridProps } from './grid';

export interface GardenProps {
}

export interface GardenState {
    width: number;
    height: number;
}

class Garden extends React.Component<GardenProps, GardenState> {

    constructor (props: GardenProps) {
        super(props);

        this.state = {
            width: 20,
            height: 20,
        }

        this.onSettingsChange = this.onSettingsChange.bind(this);
    }

    onSettingsChange (name: string, value: any) {
        if (Object.keys(this.state).indexOf(name) === -1) {
            return;
        }

        const newState: any = this.state;
        newState[name] = value;

        this.setState(newState);
    }

    render () {
        const { width, height } = this.state;
        const gardenGridProps: GardenGridProps = {
            width,
            height
        }
        const settingsProps: SettingsProps = {
            width,
            height,
            onChange: this.onSettingsChange
        }

        return <div className="garden">
            <Settings {...settingsProps}></Settings>
            <GardenGrid {...gardenGridProps}></GardenGrid>
        </div>;
    }
}

export default Garden;
