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
            <Form testId="form" className="lg:relative lg:top-1/4 lg:transform lg:-translate-y-1/4 px-4 py-5 space-y-6 sm:p-6" onSubmit={this.onFormSubmit}>
                <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-4">
                        <h2 className="text-lg font-bold">{ __('Register') }</h2>
                    </div>
                    { error }
                    <Form.Group className="col-span-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="mt-1">
                            <Form.Email className="px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border" testId="email" placeholder={__('Email')} name="email" value={this.state.email} onChange={this.onEmailChange} />
                        </div>
                    </Form.Group>
                    <Form.Group className="col-span-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="mt-1">
                            <Form.Password className="px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border" testId="password" placeholder={__('Password')} name="password" value={this.state.password} onChange={this.onPasswordChange} />
                        </div>
                    </Form.Group>
                    <Form.Group className="col-span-4">
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="mt-1">
                            <Form.Password className="px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border" testId="confirm-password" placeholder={__('Confirm Password')} name="confirm-password" value={this.state.confirmPassword} onChange={this.onConfirmPasswordChange} />
                        </div>
                    </Form.Group>
                    <div className="col-span-4 flex justify-between">
                        <Form.Submit className="bg-primary-600 hover:bg-primary-700 text-white text-base font-medium px-4 py-2 rounded-md shadow-sm" testId="submit" value={__('Register')} />
                        <Link  className="bg-secondary-600 hover:bg-secondary-700 text-white text-base font-medium px-4 py-2 rounded-md shadow-sm" to={LOGIN_URL}>&larr; { __('Back to Login') }</Link>
                    </div>
                </div>
            </Form>
        </Page>
    }
}

export default Register;
