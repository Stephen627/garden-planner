import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { __ } from '../utils/lang';
import { Auth } from '../utils/user';
import AuthError from '../utils/authenticator/auth-error-interface';
import { HOME_URL } from '../routes';
import { Page } from '../layouts/not-logged-in';
import Form from '../components/form';

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
            <Form className="center-form" onSubmit={this.onFormSubmit}>
                <div className="center-form__inner">
                    <div className="u-text-center u-margin-bottom-small">
                        <h2 className="heading-secondary">{ __('Login') }</h2>
                    </div>
                    { error }
                    <Form.Group className="center-form__group">
                        <Form.Email placeholder={__('Email')} name="email" value={this.state.email} onChange={this.onEmailChange} />
                    </Form.Group>
                    <Form.Group className="center-form__group">
                        <Form.Password placeholder={__('Password')} name="password" value={this.state.password} onChange={this.onPasswordChange} />
                    </Form.Group>
                    <div className="u-margin-top-small u-margin-bottom-small">
                        <Form.Submit className="btn btn--secondary" value={__('Login')} />
                    </div>
                    <div className="u-text-center">
                        <Link to="/register">{ __('Click here to register') }</Link>
                    </div>
                </div>
            </Form>
        </Page>;
    }
}

export default Login;
