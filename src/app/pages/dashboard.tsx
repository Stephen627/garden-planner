import * as React from 'react';
import { Page } from '../layouts/logged-in';
import Garden from '../components/garden';

export interface DashboardProps {
};

export interface DashboardState {
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
    render () {

        return <Page overflow-auto>
            <div className="dashboard">
                <Garden/>
            </div>
        </Page>
    }
};

export default Dashboard;
