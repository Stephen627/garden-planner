import { setLoading } from "../actions/general"
import Garden from "../utils/database/garden";
import { db } from "../utils/db";
import { Payload } from "../actions/types";

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
        db.set(`gardens/${userID}`, gardens).then(() => {
            dispatch(getGardens(userID));
            dispatch(setLoading(false));
        });
    }
}

export const updateGarden = (userId: string, gardenId: string, garden: Garden) => {
    return (dispatch: Function) => {
        dispatch(setLoading(true));
        db.set(`gardens/${userId}/${gardenId}`, garden).then(() => {
            dispatch(getGardens(userId));
            dispatch(setLoading(false));
        });
    }
}

export const getGardens = (userID: string) => {
    return (dispatch: Function) => {
        dispatch(setLoading(true));
        db.get(`gardens/${userID}`).then((data: Garden[]) => {
            dispatch(setGardens(data));
            dispatch(setLoading(false));
        });
    }
}

export const addGarden = (userId: string, garden: Garden) => {
    return (dispatch: Function) => {
        dispatch(setLoading(true));
        db.push(`gardens/${userId}`, garden).then(() => {
            dispatch(getGardens(userId));
            dispatch(setLoading(false));
        });
    }
}
