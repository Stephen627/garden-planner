import * as React from 'react';
import { Header } from '../layouts/header';
import { Footer } from '../layouts/footer';

export interface DashboardProps {

};

export const Dashboard = (props: DashboardProps) => {
    return <div className="page">
        <Header />
        <h1>Dashboard</h1>
        <Footer />
    </div>
};