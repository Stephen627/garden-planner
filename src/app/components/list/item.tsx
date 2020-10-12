import * as React from 'react';

export interface ItemProps {
    children?: React.ReactNode;
    onClick?: any;
    key: any;
}

export const Item = (props: ItemProps) => <li className="list__item" key={props.key} onClick={props.onClick}>{props.children}</li>;
