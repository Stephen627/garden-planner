import * as React from 'react';
import { Header } from './header';


export const Page = (props: any) => {
    return <div className="page">
        <Header />
        <div className={'page__content' + (props['overflow-auto'] ? ' page__content--auto' : '')}>
            {props.children}
        </div>
    </div>
};