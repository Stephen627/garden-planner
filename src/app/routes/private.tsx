import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { LOGIN_URL } from './index';
import { Auth } from '../user';

export interface PrivateRouteProps {
    path: string,
};

export const PrivateRoute = (props: any, ...rest: any[]) => {
    return <Route
        {...rest}
        render={
            ({location}) => Auth.isAuthenticated 
                ? (props.children)
                : ( <Redirect to={{ pathname: LOGIN_URL, state: { from: location }}} /> )
        }
    />;
}