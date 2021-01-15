import * as React from 'react';

export interface ItemProps {
    children?: React.ReactNode;
    onClick?: any;
    className?: string;
}

export const Item = (props: ItemProps) => {
   return <li className={props.className} onClick={props.onClick}>
       {props.children}
    </li>;
}
