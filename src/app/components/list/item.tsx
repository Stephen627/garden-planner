import * as React from 'react';

export interface ItemProps {
    children?: React.ReactNode;
}

export const Item = (props: ItemProps) => <li>props.children</li>;
