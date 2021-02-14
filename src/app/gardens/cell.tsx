import * as React from 'react';
import PromiseImage from '../components/promise-image';
import Plant from '../utils/database/plant';
import { storage } from '../utils/storage';
import { Auth } from '../utils/user';
import { Coords } from './grid';
import promiseKeeper from '../utils/promise-keeper';

export interface CellProps {
    coords: Coords;
    background: string;
    plant: string;
    plantData?: Plant;
    bottom: boolean;
    right: boolean;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Cell: React.FC<CellProps> = (props) => {
    const classes = [
        'cell', 'w-12', 'h-12', 'border-t-2', 'border-l-2', 'overflow-hidden'
    ];
    props.bottom && classes.push('border-b-2');
    props.right && classes.push('border-r-2');

    const getImagePromise = (url: string): Promise<string> => {
        const uid = Auth.currentUser().uid;
        if (!promiseKeeper.get(url)) {
            const promise = storage.get(`${uid}/${url}`);
            promiseKeeper.set(url, promise);
        }
        return new Promise(resolve => {
            resolve(promiseKeeper.get(url));
        });
    }

    return <div onClick={props.onClick} className={classes.join(' ')} data-x={props.coords.x} data-y={props.coords.y}>
        {
            typeof props.plantData !== 'undefined' && typeof props.plantData.icon !== 'undefined' && props.plantData.icon ?
            <PromiseImage
                className="min-w-full min-h-full object-fill"
                imagePromise={getImagePromise(props.plantData.icon)}
                alt={props.plantData.name}
            /> :
            ''
        }
    </div>
}