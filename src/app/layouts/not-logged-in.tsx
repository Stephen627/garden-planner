import * as React from 'react';

export const Page = (props: any) => {
    return <div className="page page--not-logged-in">
        {props.children}
    </div>
}