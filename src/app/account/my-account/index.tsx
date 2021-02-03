import * as React from 'react';
import { Page } from '../../layouts/logged-in';
import Profile from './profile';

const MyAccount = () => {
    return <Page title="Your Account">
        <div className="mx-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <Profile/>
            </div>
        </div>
    </Page>
}

export default MyAccount;
