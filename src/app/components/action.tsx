import * as React from 'react';

export interface ActionProps {
    children?: React.ReactNode;
    onClick: any;
}

export const Action = (props: ActionProps) => <a onClick={props.onClick} className="fixed cursor-pointer bottom-10 leading-16 text-4xl shadow-sm text-center right-10 w-16 h-16 text-white rounded-full bg-primary-600 hover:bg-primary-700">
    {props.children}
</a>

export default Action;
