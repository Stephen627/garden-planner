import * as React from 'react';
import { Header } from './header';


export const Page = (props: any) => {
    return <div data-testid="page" className="relative bg-white min-h-screen text-gray-700">
        <Header />
        { props.title && <div className="bg-white mx-auto max-w-7x1 px-4 sm:px-6">
            <div className="py-6 px-4 sm:px-6 lg:px-8 border-b-2 border-gray-100">
                <h1 className="items-center text-3xl font-bold leading-tight">{ props.title }</h1>
            </div>
        </div> }
        {props.children}
    </div>
};