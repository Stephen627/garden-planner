import * as React from 'react';
import Plant from '../utils/database/plant';
import { Cell } from './cell';

export interface GardenGridProps {
    width: number;
    height: number;
    cellContents?: CellContent[][];
    onCellClick: (coords: Coords) => void;
    plants: { [key: string]: Plant };
}

export interface CellContent {
    background: string;
    plant: string;
    plantData?: Plant;
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
                const content: CellContent = typeof cellContents[j] === 'undefined' || typeof cellContents[j][i] === 'undefined' ? {
                    background: null,
                    plant: null,
                    plantData: {
                        name: null,
                        icon: null
                    }
                } : cellContents[j][i];

                if (typeof this.props.plants !== 'undefined' && typeof this.props.plants[content.plant] !== 'undefined') {
                    content.plantData = this.props.plants[content.plant];
                }

                cells[j] = <Cell onClick={() => this.props.onCellClick({ x: j, y: i })} key={`${j}x${i}`} {...content} bottom={i === height - 1} right={j === width - 1}></Cell>;
            }
            rows.push(<div key={i} className="flex flex-row justify-center">{cells}</div>);
        }
        return <div className="overflow-auto"><div className="py-4 w-screen">{rows}</div></div>
    }
}

export default GardenGrid;
