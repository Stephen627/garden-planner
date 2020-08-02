import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { LOGIN_URL } from './index';
import { Auth } from '../utils/user';

export interface PrivateRouteProps {
    path: string,
};

export const PrivateRoute = (props: any, ...rest: any[]) => {
    return <Route
        {...rest}
        render={
            ({location}) => Auth.isAuthenticated 
                ? (props.render())
                : ( <Redirect to={{ pathname: LOGIN_URL, state: { from: location }}} /> )
        }
    />;
}