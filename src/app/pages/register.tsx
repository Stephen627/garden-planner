import * as React from 'react';

import { Redirect, Link } from 'react-router-dom';

import { __ } from '../utils/lang';
import { Auth } from '../utils/user';
import AuthError from '../utils/authenticator/auth-error-interface';
import { HOME_URL, LOGIN_URL } from '../routes';
import { Page } from '../layouts/not-logged-in';
import Form from '../components/form';

export interface RegisterProps {
}
export interface RegisterState {
    error: string,
    toDashboard: boolean,
    email: string,
    password: string,
    confirmPassword: string
}

class Register extends React.Component<RegisterProps, RegisterState> {

    constructor (props: RegisterProps) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);

        this.state = {
            error: '',
            toDashboard: false,
            email: '',
            password: '',
            confirmPassword: ''
        };
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
    
    onConfirmPasswordChange (evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            confirmPassword: evt.target.value
        });
    }

    onFormSubmit (evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                error: __('Your passwords do not match')
            });
            return;
        }

        this.setState({
            error: ''
        });
        Auth.register(this.state.email, this.state.password).then(() => {
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
            <Form className="center-form" onSubmit={this.onFormSubmit}>
                <div className="center-form__inner">
                    <div className="u-text-center u-margin-bottom-small">
                        <h2 className="heading-secondary">{ __('Register') }</h2>
                    </div>
                    { error }
                    <Form.Group className="center-form__group">
                        <Form.Email placeholder={__('Email')} name="email" value={this.state.email} onChange={this.onEmailChange} />
                    </Form.Group>
                    <Form.Group className="center-form__group">
                        <Form.Password placeholder={__('Password')} name="password" value={this.state.password} onChange={this.onPasswordChange} />
                    </Form.Group>
                    <Form.Group className="center-form__group">
                        <Form.Password placeholder={__('Confirm Password')} name="password" value={this.state.confirmPassword} onChange={this.onConfirmPasswordChange} />
                    </Form.Group>
                    <div className="u-margin-top-small u-margin-bottom-small">
                        <Form.Submit className="btn btn--secondary" value={__('Register')} />
                    </div>
                    <div className="u-text-center">
                        <Link to={LOGIN_URL}>&larr; { __('Back to Login') }</Link>
                    </div>
                </div>
            </Form>
        </Page>
    }
}

export default Register;
