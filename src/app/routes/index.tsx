import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from './private';

const Register = React.lazy(() => import(/* webpackChunkName: 'pages/register' */ '../pages/register'));
const Login = React.lazy(() => import(/* webpackChunkName: 'pages/login' */ '../pages/login'));
const Dashboard = React.lazy(() => import(/* webpackChunkName: 'pages/dashboard' */ '../pages/dashboard'));
const MyAccount = React.lazy(() => import(/* webpackChunkName: 'pages/my-account' */ '../pages/my-account'));

export const REGISTER_URL = '/register';
export const LOGIN_URL = '/login';
export const PLANTS_URL = '/plants';
export const GARDEN_URL = '/gardens';
export const ACCOUNT_URL = '/my-account';
export const HOME_URL = '/ ';

export const pages = [
    <Route path={REGISTER_URL} render={() => <Register/>}></Route>,
    <Route path={LOGIN_URL} render={() => <Login/>}></Route>,
    <PrivateRoute path={ACCOUNT_URL} render={() => <MyAccount/>}></PrivateRoute>,
    <PrivateRoute path={HOME_URL} render={() => <Dashboard/>}></PrivateRoute>,
    <Redirect to={HOME_URL} />, // If no routes are matched then redirect the user to the home page
];
