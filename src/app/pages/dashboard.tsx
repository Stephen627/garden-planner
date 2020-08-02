import * as React from 'react';
import { Page } from '../layouts/logged-in';
import { Settings, SettingsProps } from '../components/settings';
import { GardenGrid, GardenGridProps } from '../components/garden/grid';

export interface DashboardProps {

};

export interface DashboardState {
    width: number;
    height: number;
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {

    constructor (props: DashboardProps) {
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

        return <Page overflow-auto>
            <div className="dashboard">
                <Settings {...settingsProps}></Settings>
                <GardenGrid {...gardenGridProps}></GardenGrid>
            </div>
        </Page>
    }
};

export default Dashboard;
