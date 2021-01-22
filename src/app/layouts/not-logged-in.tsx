import * as React from 'react';

const { default: loginImage } = require('../../images/login.jpg');

export const Page = (props: any) => {
    return <div data-testid="page" className="relative flex flex-row min-h-screen">
        <div className="absolute lg:w-4/12 w-10/12 bg-white rounded shadow left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:transform-none lg:static z-50">
            {props.children}
        </div>
        <div className="w-full sm:w-full lg:w-8/12 bg-primary-400">
            <img src={loginImage} className="h-full object-cover opacity-30" />
        </div>
    </div>
}