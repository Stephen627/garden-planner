import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { LOGIN_URL, PLANTS_URL, GARDENS_URL, ACCOUNT_URL, HOME_URL } from '../routes';
import { Auth } from '../utils/user';
import { __ } from '../utils/lang';

const { default: logo } = require('../../images/logo.svg');

export interface HeaderProps {
}
export interface HeaderState {
    toLogin: boolean;
    showMobileMenu: boolean;
}

export class Header extends React.Component<HeaderProps, HeaderState> {

    constructor (props: HeaderProps) {
        super(props);

        this.onSignOutClick = this.onSignOutClick.bind(this);
        this.state = {
            toLogin: false,
            showMobileMenu: false,
        };
    }

    onSignOutClick () {
        Auth.signout().then(() => {
            this.setState({
                ...this.state,
                toLogin: true
            });
        });
    }

    render () {
        if (this.state.toLogin) {
            return <Redirect to={LOGIN_URL} />
        }

        const mobileMenuClass = [
            'absolute', 'top-0', 'inset-x-0', 'p-2', 'transition', 'transform', 'origin-top-right', 'md:hidden'
        ];
        const mobileMenuExtras = this.state.showMobileMenu
            ? ['duration-100 ease-in', 'opacity-100', 'scale-95']
            : ['duration-200 ease-out', 'opacity-0', 'scale-100', 'pointer-events-none'];

        return <header className="mx-w-7x1 mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                    <Link to={HOME_URL}>
                        <span className="sr-only">{__('Garden Planner')}</span>
                        <img className="h-8 w-auto sm:h-10" src={logo} alt="Logo"/>
                    </Link>
                </div>
                <div className="-mr-2 -my-2 md:hidden">
                    <button type="button" onClick={ () => this.setState({...this.state, showMobileMenu: true}) } className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                        <span className="sr-only">Open menu</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                <nav className="hidden md:flex space-x-10">
                    <Link className="text-base font-medium text-gray-500 hover:text-gray-900" to={GARDENS_URL}>{ __('Gardens') }</Link>
                    <Link className="text-base font-medium text-gray-500 hover:text-gray-900" to={PLANTS_URL}>{ __('Plants') }</Link>
                </nav>
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                    <a href="#" className="whitespace-nowrap text-base font-medium px-4 py-2 rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700" onClick={this.onSignOutClick}>
                        { __('Sign Out') }
                    </a>
                </div>
            </div>

            <div className={[ ...mobileMenuClass, ...mobileMenuExtras ].join(' ')}>
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                    <div className="pt-5 pb-6 px-5">
                        <div className="flex items-center justify-between">
                            <Link to={HOME_URL}>
                                <img className="h-8 w-auto" src={logo} alt="Logo"/>
                            </Link>
                            <div className="-mr-2">
                                <button type="button" onClick={ () => this.setState({...this.state, showMobileMenu: false}) } className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                                    <span className="sr-only">Close menu</span>
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <nav className="grid gap-y-2">
                            <Link className="p-3 flex items-center rounded-md hover:bg-gray-50" to={GARDENS_URL}>
                                <span className="ml-3 text-base font-medium text-gray-900">
                                    { __('Gardens') }
                                </span>
                            </Link>
                            <Link className="p-3 flex items-center rounded-md hover:bg-gray-50" to={PLANTS_URL}>
                                <span className="ml-3 text-base font-medium text-gray-900">
                                    { __('Plants') }
                                </span>
                            </Link>
                        </nav>
                    </div>
                    <div>
                        <a href="#" className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700">
                            { __('Sign out') }
                        </a>
                    </div>
                </div>
            </div>
        </header>
    }
}