import * as React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { PrivateRoute } from './private';

const Register = React.lazy(() => import(/* webpackChunkName: 'pages/register' */ '../pages/register'));
const Login = React.lazy(() => import(/* webpackChunkName: 'pages/login' */ '../pages/login'));
const Dashboard = React.lazy(() => import(/* webpackChunkName: 'pages/dashboard' */ '../pages/dashboard'));
const MyAccount = React.lazy(() => import(/* webpackChunkName: 'pages/my-account' */ '../pages/my-account'));
const Gardens = React.lazy(() => import(/* webpackChunkName: 'pages/gardens' */ '../pages/gardens'));
const Garden = React.lazy(() => import(/* webpackChunkName: 'pages/garden' */ '../pages/garden'));

export const REGISTER_URL = '/register';
export const LOGIN_URL = '/login';
export const PLANTS_URL = '/plants';
export const GARDENS_URL = '/gardens';
export const GARDEN_URL = '/garden/:id';
export const ACCOUNT_URL = '/my-account';
export const HOME_URL = '/ ';

export const pages: any[] = [
    <Route key="register" exact path={REGISTER_URL} component={Register}></Route>,
    <Route key="login" exact path={LOGIN_URL} component={Login}></Route>,
    <PrivateRoute key="my-account" path={ACCOUNT_URL} component={MyAccount}></PrivateRoute>,
    <PrivateRoute key="gardens" path={GARDENS_URL} component={Gardens}></PrivateRoute>,
    <PrivateRoute key="garden" path={GARDEN_URL} component={Garden}></PrivateRoute>,
    <PrivateRoute key="home" path={HOME_URL} component={Dashboard}></PrivateRoute>,
    <Redirect key="home-redirect" to={HOME_URL} />, // If no routes are matched then redirect the user to the home page
];
