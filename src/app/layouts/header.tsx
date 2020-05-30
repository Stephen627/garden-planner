import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { LOGIN_URL } from '../routes';
import { Auth } from '../user';
import { __ } from '../lang';

export interface HeaderProps {
};
export interface HeaderState {
    toLogin: boolean,
}

export class Header extends React.Component<HeaderProps, HeaderState> {

    constructor (props: HeaderProps) {
        super(props);

        this.onSignOutClick = this.onSignOutClick.bind(this);
        this.state = {
            toLogin: false
        };
    }

    onSignOutClick () {
        Auth.signout().then(() => {
            this.setState({
                toLogin: true
            });
        });
    }

    render () {
        if (this.state.toLogin) {
            return <Redirect to={LOGIN_URL} />
        }

        return <header className="header">
            <nav className="menu">
                <div className="menu__logo">
                    <h1 className="menu__name">{ __('Garden Planner') }</h1>
                </div>
                <ul className="menu__list menu__list--main">
                    <li className="menu__item">
                        <a>
                            <i className="fas fa-tree"></i>
                            Gardens
                        </a>
                    </li>
                    <li className="menu__item">
                        <a>
                            <i className="fas fa-seedling"></i>
                            Plants
                        </a>
                    </li> 
                </ul>
                <ul className="menu__list menu__list--right">
                    <li className="menu__item" onClick={this.onSignOutClick}>
                        <a>
                            <i className="fas fa-sign-out-alt"></i>
                            Sign Out
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    }
}