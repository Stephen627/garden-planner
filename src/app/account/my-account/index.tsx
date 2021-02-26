import * as React from 'react';
import { Page } from '../../layouts/logged-in';
import Password from './password';
import Profile from './profile';
import ExportImport from './export-import';

const MyAccount = () => {
    return <Page title="Your Account">
        <div className="mx-6 mb-4">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <Profile/>
                <Password/>
                <ExportImport/>
            </div>
        </div>
    </Page>
}

export default MyAccount;
