import * as React from 'react';

import { Redirect, Link } from 'react-router-dom';

import { __ } from '../utils/lang';
import { Auth } from '../utils/user';
import AuthError from '../utils/authenticator/auth-error-interface';
import { HOME_URL, LOGIN_URL } from '../routes';
import { Page } from '../layouts/not-logged-in';

export interface RegisterProps {
}
export interface RegisterState {
    error: string,
    toDashboard: boolean
}

class Register extends React.Component<RegisterProps, RegisterState> {
    protected email: React.RefObject<HTMLInputElement>;
    protected password: React.RefObject<HTMLInputElement>;
    protected confirmPassword: React.RefObject<HTMLInputElement>;

    constructor (props: RegisterProps) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.email = React.createRef();
        this.password = React.createRef();
        this.confirmPassword = React.createRef();

        this.state = {
            error: '',
            toDashboard: false
        };
    }

    onFormSubmit (evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        if (this.password.current.value !== this.confirmPassword.current.value) {
            this.setState({
                error: __('Your passwords do not match')
            });
            return;
        }

        this.setState({
            error: ''
        });
        Auth.register(this.email.current.value, this.password.current.value).then(() => {
            this.setState({
                toDashboard: true
            })
        }).catch((err: AuthError) => {
            this.setState({
                error: __(err.code)
            });
        });
    }

    render () {
        if (this.state.toDashboard || Auth.isAuthenticated()) {
            return <Redirect to={HOME_URL} />
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
                        <h2 className="heading-secondary">{ __('Register') }</h2>
                    </div>
                    { error }
                    <div className="center-form__group">
                        <input placeholder={__('Email')} type="email" name="email" ref={this.email} />
                    </div>
                    <div className="center-form__group">
                        <input placeholder={__('Password')} type="password" name="password" ref={this.password} />
                    </div>
                    <div className="center-form__group">
                        <input placeholder={__('Confirm Password')} type="password" name="password-confirm" ref={this.confirmPassword} />
                    </div>
                    <div className="u-margin-bottom-small u-margin-top-small">
                        <input className="btn btn--secondary" type="submit" value={ __('Register') } />
                    </div>
                    <div className="u-text-center">
                        <Link to={LOGIN_URL}>&larr; { __('Back to Login') }</Link>
                    </div>
                </div>
            </form>
        </Page>
    }
}

export default Register;
