import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { LOGIN_URL, PLANTS_URL, GARDENS_URL, ACCOUNT_URL } from '../routes';
import { Auth } from '../utils/user';
import { __ } from '../utils/lang';

const { default: logo } = require('../../images/logo.svg');

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
                    <img className="menu__logo-image" src={logo} alt="Logo"/>
                </div>
                <ul className="menu__list menu__list--main">
                    <li className="menu__item">
                        <Link to={GARDENS_URL}>Gardens</Link>
                    </li>
                    <li className="menu__item">
                        <Link to={PLANTS_URL}>Plants</Link>
                    </li> 
                </ul>
                <ul className="menu__list menu__list--right">
                    <li className="menu__item" onClick={this.onSignOutClick}>
                        Sign Out
                    </li>
                    <li className="menu__item">
                        <Link to={ACCOUNT_URL}>My Account</Link>
                    </li>
                </ul>
                <div className="mobile-menu">
                    <input className="mobile-menu__checkbox" type="checkbox" id="mobile-menu-toggle" />
                    <label className="mobile-menu__button" htmlFor="mobile-menu-toggle">
                        <span className="mobile-menu__icon"></span>
                    </label>
                    <div className="mobile-menu__background"></div>
                    <ul className="mobile-menu__list">
                        <li className="mobile-menu__list-item">
                            <Link to={GARDENS_URL}>Gardens</Link>
                        </li>
                        <li className="mobile-menu__list-item">
                            <Link to={PLANTS_URL}>Plants</Link>
                        </li>
                        <li className="mobile-menu__list-item">
                            <Link to={ACCOUNT_URL}>My Account</Link>
                        </li>
                        <li className="mobile-menu__list-item" onClick={this.onSignOutClick}>
                            <a href="#">Sign Out</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    }
}