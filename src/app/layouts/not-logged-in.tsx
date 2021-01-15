import * as React from 'react';

export const Page = (props: any) => {
    return <div data-testid="page" className="relative bg-white min-height-screen">
        {props.children}
    </div>
}