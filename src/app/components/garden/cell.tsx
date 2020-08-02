import * as React from 'react';

export interface CellProps {
    background: string;
    plant: string;
}

export const Cell = (props: CellProps) => {
    return <div className="garden-grid__cell"></div>
}