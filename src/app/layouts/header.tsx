import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { LOGIN_URL } from '../routes';
import { Auth } from '../user';

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

        return <header>
            <nav>
                <ul>
                    <li>
                        <a onClick={this.onSignOutClick}>Sign Out</a>
                    </li>
                </ul>
            </nav>
        </header>
    }
}