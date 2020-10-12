import * as React from 'react';

export interface CellProps {
    background: string;
    plant: string;
    key: any;
}

export const Cell = (props: CellProps) => {
    return <div key={props.key} className="garden-grid__cell"></div>
}