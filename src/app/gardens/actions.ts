import { setLoading } from "../actions/general"
import Garden from "../utils/database/garden";
import { db } from "../utils/db";
import { Payload } from "../actions/types";
import { CellContent, Coords } from "./grid";

export interface GardensState {
    list: Garden[]
}

export const SET_GARDENS = 'SET_GARDENS';
export const setGardens = (gardens: Garden[]): Payload => {
    return {
        type: SET_GARDENS,
        data: gardens
    }
}

export const updateGardens = (userID: string, gardens: Garden[]) => {
    return (dispatch: Function) => {
        dispatch(setLoading(true));
        db.set(`${userID}/gardens`, gardens).then(() => {
            dispatch(getGardens(userID));
            dispatch(setLoading(false));
        });
    }
}

export const updateCell = (userId: string, gardenId: string, month: string, coords: Coords, cellContents: CellContent) => {
    return (dispatch: Function) => {
        dispatch(setLoading(true));
        db.set(`${userId}/gardens/${gardenId}/cells/${month}/${coords.x}/${coords.y}`, cellContents).then(() => {
            dispatch(getGardens(userId));
            dispatch(setLoading(false));
        });
    }
}

export const updateCells = (userId: string, gardenId: string, month: string, coords: Coords[], cellContents: CellContent) => {
    return (dispatch: Function) => {
        dispatch(setLoading(true));
        const promises: Promise<any>[] = [];

        coords.forEach((coord: Coords) => {
            promises.push(
                db.set(`${userId}/gardens/${gardenId}/cells/${month}/${coord.x}/${coord.y}`, cellContents)
            );
        });

        Promise.all(promises).then(() => {
            dispatch(getGardens(userId));
            dispatch(setLoading(false));
        })
    }
}

export const updateGarden = (userId: string, gardenId: string, garden: Garden) => {
    return (dispatch: Function) => {
        dispatch(setLoading(true));
        db.set(`${userId}/gardens/${gardenId}`, garden).then(() => {
            dispatch(getGardens(userId));
            dispatch(setLoading(false));
        });
    }
}

export const getGardens = (userID: string) => {
    return (dispatch: Function) => {
        dispatch(setLoading(true));
        db.get(`${userID}/gardens`).then((data: Garden[]) => {
            dispatch(setGardens(data));
            dispatch(setLoading(false));
        });
    }
}

export const addGarden = (userId: string, garden: Garden) => {
    return (dispatch: Function) => {
        dispatch(setLoading(true));
        db.push(`${userId}/gardens`, garden).then(() => {
            dispatch(getGardens(userId));
            dispatch(setLoading(false));
        });
    }
}
