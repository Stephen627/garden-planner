import * as React from 'react';

export interface CellProps {
    background: string;
    plant: string;
    key: any;
    bottom: boolean;
    right: boolean;
}

export const Cell = (props: CellProps) => {
    const classes = [
        'w-12', 'h-12', 'border-t-2', 'border-l-2'
    ];
    props.bottom && classes.push('border-b-2');
    props.right && classes.push('border-r-2');

    return <div className={classes.join(' ')}></div>
}