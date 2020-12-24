import * as React from 'react';
import { Cell } from './cell';

export interface GardenGridProps {
    width: number;
    height: number;
    defaultCellContents?: CellContent[][];
}

export interface CellContent {
    background: string;
    plant: string;
}

export interface GardenGridState {
    cellContents: CellContent[][];
}

export class GardenGrid extends React.Component<GardenGridProps, GardenGridState> {

    constructor (props: GardenGridProps) {
        super(props);

        this.state = {
            cellContents: props.defaultCellContents ? props.defaultCellContents : []
        };
    }

    render () {
        const { width, height } = this.props;
        const { cellContents } = this.state;
        const rows = [];

        for (let i = 0; i < height; i++) {
            const cells = [];
            for (let j = 0; j < width; j++) {
                const content: CellContent = typeof cellContents[i] === 'undefined' || typeof cellContents[i][j] === 'undefined' ? {
                    background: null,
                    plant: null
                } : cellContents[i][j];
                cells[j] = <Cell key={`${i}x${j}`} {...content}></Cell>;
            }
            rows.push(<div key={i} className="garden-grid__row">{cells}</div>);
        }
        return <div className="garden-grid"><div className="garden-grid__inner">{rows}</div></div>
    }
}
