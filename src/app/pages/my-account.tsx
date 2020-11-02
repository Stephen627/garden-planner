import * as React from 'react';
import { Page } from '../layouts/logged-in';

export interface MyAccountProps {

}

const MyAccount = (props: MyAccountProps) => {
    return <Page>
        <h1 className="heading-primary">Your Account</h1>
    </Page>
}

export default MyAccount;
