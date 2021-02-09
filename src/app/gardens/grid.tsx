import * as React from 'react';
import { Cell } from './cell';

export interface GardenGridProps {
    width: number;
    height: number;
    cellContents?: CellContent[][];
    onCellClick: (coords: Coords) => void;
}

export interface CellContent {
    background: string;
    plant: string;
}

export interface GardenGridState {
}

export interface Coords {
    x: number;
    y: number;
}

export class GardenGrid extends React.Component<GardenGridProps, GardenGridState> {

    render () {
        const { width, height, cellContents } = this.props;
        const rows = [];

        for (let i = 0; i < height; i++) {
            const cells = [];
            for (let j = 0; j < width; j++) {
                const content: CellContent = typeof cellContents[i] === 'undefined' || typeof cellContents[i][j] === 'undefined' ? {
                    background: null,
                    plant: null,
                } : cellContents[i][j];
                cells[j] = <Cell onClick={() => this.props.onCellClick({ x: j, y: i })} key={`${j}x${i}`} {...content} bottom={i === height - 1} right={j === width - 1}></Cell>;
            }
            rows.push(<div key={i} className="flex flex-row">{cells}</div>);
        }
        return <div className="overflow-auto mx-8"><div className="py-4 w-max">{rows}</div></div>
    }
}

export default GardenGrid;
