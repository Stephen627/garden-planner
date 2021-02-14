import * as React from 'react';
import { Page } from '../layouts/logged-in';
import Loading from '../components/loading';
import { Redirect } from 'react-router-dom';
import { GARDENS_URL } from '../routes';

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
                <Redirect to={GARDENS_URL} />
            </div>
        </Page>
    }
}

export default Dashboard;
