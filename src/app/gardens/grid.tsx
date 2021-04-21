import * as React from 'react';
import Selecto from 'react-selecto';

import Plant from '../utils/database/plant';
import { Cell } from './cell';

export interface GardenGridProps {
    width: number;
    height: number;
    cellContents?: CellContent[][];
    onCellSelect: (coords: Coords[]) => void;
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

    private gridRef: React.RefObject<HTMLDivElement>;

    constructor (props: GardenGridProps) {
        super(props);

        this.gridRef = React.createRef();
    }

    render () {
        const { width, height, cellContents } = this.props;
        const rows = [];

        for (let i = 0; i < height; i++) {
            const cells = [];
            for (let j = 0; j < width; j++) {
                const content: CellContent = typeof cellContents[j] === 'undefined' || typeof cellContents[j][i] === 'undefined' || !cellContents[j][i] ? {
                    background: null,
                    plant: null,
                    plantData: {
                        name: null,
                        icon: null,
                        hardiness: null
                    }
                } : cellContents[j][i];

                if (content.plant && typeof this.props.plants !== 'undefined' && typeof this.props.plants[content.plant] !== 'undefined') {
                    content.plantData = this.props.plants[content.plant];
                }

                cells[j] = <Cell
                    coords={{ x: j, y: i }}
                    onClick={() => {}}
                    key={`${j}x${i}`}
                    bottom={i === height - 1}
                    right={j === width - 1}
                    {...content}
                />;
            }
            rows.push(<div key={i} className="flex flex-row justify-center">{cells}</div>);
        }
        return <div className="grid overflow-auto">
            <div ref={this.gridRef} className="py-4">{rows}</div>
            <Selecto
                container={this.gridRef.current}
                dragContainer={this.gridRef.current}
                selectableTargets={['.cell']}
                continueSelect={false}
                keyContainer={this.gridRef.current}
                hitRate={30}
                onSelectEnd={evt => {
                    const selected: Coords[] = [];
                    evt.selected.forEach((element) => {
                        selected.push({
                            x: parseInt(element.dataset['x']),
                            y: parseInt(element.dataset['y'])
                        });
                    });

                    if (selected.length) {
                        this.props.onCellSelect(selected);
                    }
                }}
            />
        </div>
    }
}

export default GardenGrid;
