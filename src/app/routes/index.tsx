import * as React from 'react';
import { Route } from 'react-router-dom';
import { PrivateRoute } from './private';

import { Register } from '../pages/register';
import { Login } from '../pages/login';
import { Dashboard } from '../pages/dashboard';

export const REGISTER_URL = '/register';
export const LOGIN_URL = '/login';
export const HOME_URL = '/';

export const pages = [
    <Route path={REGISTER_URL}><Register/></Route>,
    <Route path={LOGIN_URL}><Login/></Route>,
    <PrivateRoute path={HOME_URL}><Dashboard/></PrivateRoute>
];
