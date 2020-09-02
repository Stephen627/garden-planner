import * as React from 'react';

export interface ItemProps {
    children?: React.ReactNode;
    onClick?: any;
}

export const Item = (props: ItemProps) => <li onClick={props.onClick}>{props.children}</li>;
