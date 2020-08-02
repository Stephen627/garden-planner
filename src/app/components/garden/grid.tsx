import * as React from 'react';
import { Cell } from './cell';

export interface GardenGridProps {
    width: number;
    height: number;
};

export interface CellContent {
    background: string;
    plant: string;
};

export interface GardenGridState {
    cellContents: CellContent[][];
};

export class GardenGrid extends React.Component<GardenGridProps, GardenGridState> {

    constructor (props: GardenGridProps) {
        super(props);

        this.state = {
            cellContents: []
        };
    }

    render () {
        const { width, height } = this.props;
        const { cellContents } = this.state;
        const rows = [];

        for (let i = 0; i < width; i++) {
            const cells = [];
            for (let j = 0; j < height; j++) {
                const content: CellContent = typeof cellContents[i] === 'undefined' || typeof cellContents[i][j] === 'undefined' ? {
                    background: null,
                    plant: null
                } : cellContents[i][j];
                cells[j] = <Cell {...content}></Cell>;
            }
            rows.push(<div className="garden-grid__row">{cells}</div>);
        }
        return <div className="garden-grid">{rows}</div>
    }
}
