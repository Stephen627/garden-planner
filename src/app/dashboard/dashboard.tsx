import * as React from 'react';
import { Page } from '../layouts/logged-in';
import Loading from '../components/loading';

export interface DashboardProps {
}

export interface DashboardState {
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
    render () {

        const garden = {
            width: 20,
            height: 20,
            name: 'Dashboard Garden'
        }

        return <Page overflow-auto>
            <div data-testid="dashboard" className="dashboard">
                <Loading></Loading>
            </div>
        </Page>
    }
}

export default Dashboard;
