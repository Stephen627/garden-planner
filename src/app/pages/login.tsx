import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { __ } from '../lang';
import { Auth } from '../user';
import { HOME_URL } from '../routes';
import { Page } from '../layouts/not-logged-in';

export interface LoginProps {
};
export interface LoginState {
    toDashboard: boolean,
    error: string
}

export class Login extends React.Component<LoginProps, LoginState> {
    protected email: React.RefObject<HTMLInputElement>;
    protected password: React.RefObject<HTMLInputElement>;

    constructor (props: LoginProps) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.email = React.createRef();
        this.password = React.createRef();

        this.state = {
            toDashboard: false,
            error: ''
        }
    }

    onFormSubmit (evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        Auth.authenticate(
            this.email.current.value,
            this.password.current.value
        ).then((data: firebase.auth.UserCredential) => {
            Auth.isAuthenticated = true;
            Auth.storeUser(data.user);

            this.setState({
                toDashboard: true
            });
        }).catch((err: firebase.auth.AuthError) => {
            this.setState({
                error: __(err.code)
            });
        });
    }

    render () {
        if (this.state.toDashboard) {
            return <Redirect to={HOME_URL} />;
        }

        const error = this.state.error
        ? <div className="alert alert--danger">
            {this.state.error}
        </div>
        : '';

        return <Page>
            <form className="center-form" onSubmit={this.onFormSubmit}>
                <div className="center-form__inner">
                    <div className="u-text-center u-margin-bottom-small">
                        <h2 className="heading-secondary">{ __('Login') }</h2>
                    </div>
                    { error }
                    <div className="center-form__group">
                        <label>{ __('Email') }</label>
                        <input type="email" name="email" ref={this.email} />
                    </div>
                    <div className="center-form__group">
                        <label>{ __('Password') }</label>
                        <input type="password" name="password" ref={this.password} />
                    </div>
                    <div className="u-margin-top-small u-margin-bottom-small">
                        <input className="btn btn--secondary" type="submit" value={ __('Login') } />
                    </div>
                    <Link to="/register">{ __('Click here to register') }</Link>
                </div>
            </form>
        </Page>;
    }
}