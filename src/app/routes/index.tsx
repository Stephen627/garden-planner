import * as React from 'react';
import { Route } from 'react-router-dom';
import { PrivateRoute } from './private';

import { Register } from '../pages/register';
import { Login } from '../pages/login';
import { Dashboard } from '../pages/dashboard';
import { MyAccount } from '../pages/my-account';

export const REGISTER_URL = '/register';
export const LOGIN_URL = '/login';
export const PLANTS_URL = '/plants';
export const GARDEN_URL = '/gardens';
export const ACCOUNT_URL = '/my-account';
export const HOME_URL = '/';

export const pages = [
    <Route path={REGISTER_URL}><Register/></Route>,
    <Route path={LOGIN_URL}><Login/></Route>,
    <PrivateRoute path={ACCOUNT_URL}><MyAccount/></PrivateRoute>,
    <PrivateRoute path={HOME_URL}><Dashboard/></PrivateRoute>,
];
