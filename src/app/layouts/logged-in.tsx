import * as React from 'react';
import { Header } from './header';


export const Page = (props: any) => {
    return <div data-testid="page" className="relative bg-white">
        <Header />
        <div className={'page__content' + (props['overflow-auto'] ? ' page__content--auto' : '')}>
            {props.children}
        </div>
    </div>
};