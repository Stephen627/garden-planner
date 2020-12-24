import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { LOGIN_URL } from './index';
import { Auth } from '../utils/user';

export interface PrivateRouteProps {
    component: React.ReactNode;
    path: string;
}

export const PrivateRoute = (props: any) => {
    const { component, ...rest } = props;
    
    if (!Auth.isAuthenticated()) {
        return <Redirect to={{ pathname: LOGIN_URL }} />
    }

    return <Route
        {...rest}
        component={component}
    ></Route>;
}