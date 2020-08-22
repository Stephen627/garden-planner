import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { __ } from '../utils/lang';
import { Auth } from '../utils/user';
import AuthError from '../utils/authenticator/auth-error-interface';
import { HOME_URL } from '../routes';
import { Page } from '../layouts/not-logged-in';

export interface LoginProps {
};
export interface LoginState {
    toDashboard: boolean,
    error: string,
    email: string,
    password: string
}

class Login extends React.Component<LoginProps, LoginState> {

    constructor (props: LoginProps) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);

        this.state = {
            toDashboard: false,
            error: '',
            email: '',
            password: ''
        }
    }

    onEmailChange (evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            email: evt.target.value
        });
    }

    onPasswordChange (evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            password: evt.target.value
        });
    }

    onFormSubmit (evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        Auth.authenticate(
            this.state.email,
            this.state.password
        ).then(() => {
            this.setState({
                toDashboard: true
            });
        }).catch((err: AuthError) => {
            this.setState({
                error: __(err.code)
            });
        });
    }

    render () {
        if (this.state.toDashboard || Auth.isAuthenticated()) {
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
                        <input
                            placeholder={__('Email')}
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onEmailChange}
                        />
                    </div>
                    <div className="center-form__group">
                        <input
                            placeholder={__('Password')}
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                    </div>
                    <div className="u-margin-top-small u-margin-bottom-small">
                        <input className="btn btn--secondary" type="submit" value={ __('Login') } />
                    </div>
                    <div className="u-text-center">
                        <Link to="/register">{ __('Click here to register') }</Link>
                    </div>
                </div>
            </form>
        </Page>;
    }
}

export default Login;
