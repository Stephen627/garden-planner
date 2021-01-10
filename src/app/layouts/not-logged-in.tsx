import * as React from 'react';

export const Page = (props: any) => {
    return <div data-testid="page" className="page page--not-logged-in">
        {props.children}
    </div>
}