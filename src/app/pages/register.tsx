import * as React from 'react';

import { Redirect, Link } from 'react-router-dom';

import { __ } from '../lang';
import { Auth } from '../user';
import { HOME_URL, LOGIN_URL } from '../routes';

export interface RegisterProps {
}
export interface RegisterState {
    error: string,
    toDashboard: boolean
}

export class Register extends React.Component<RegisterProps, RegisterState> {
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
        Auth.register(this.email.current.value, this.password.current.value).then((data: firebase.auth.UserCredential) => {
            Auth.isAuthenticated = true;
            Auth.storeUser(data.user);
            
            this.setState({
                toDashboard: true
            })
        }).catch((err: firebase.auth.AuthError) => {
            this.setState({
                error: __(err.code)
            });
        });
    }

    render () {
        if (this.state.toDashboard) {
            return <Redirect to={HOME_URL} />
        }

        const error = this.state.error
            ? <div className="alert alert--danger">
                {this.state.error}
            </div>
            : '';

        return <div className="page page--login">
            <form className="center-form" onSubmit={this.onFormSubmit}>
                <div className="center-form__inner">
                    <div className="u-text-center u-margin-bottom-small">
                        <h2 className="heading-secondary">{ __('Register') }</h2>
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
                    <div className="center-form__group">
                        <label>{ __('Confirm Password') }</label>
                        <input type="password" name="password-confirm" ref={this.confirmPassword} />
                    </div>
                    <div className="u-margin-bottom-small u-margin-top-small">
                        <input className="btn btn--secondary" type="submit" value={ __('Register') } />
                    </div>
                    <Link to={LOGIN_URL}>&larr; { __('Back to Login') }</Link>
                </div>
            </form>
        </div>
    }
}
