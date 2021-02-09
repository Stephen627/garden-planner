import * as React from 'react';
import Plant from '../utils/database/plant';

export interface CellProps {
    background: string;
    plant: string;
    bottom: boolean;
    right: boolean;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Cell: React.FC<CellProps> = (props) => {
    const classes = [
        'w-12', 'h-12', 'border-t-2', 'border-l-2'
    ];
    props.bottom && classes.push('border-b-2');
    props.right && classes.push('border-r-2');

    return <div onClick={props.onClick} className={classes.join(' ')}></div>
}