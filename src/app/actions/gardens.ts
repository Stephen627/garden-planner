import { SET_LOADING, setLoading } from "./general"
import Garden from "../utils/database/garden";
import { db } from "../utils/db";
import { Payload } from "./types";

export interface GardensState {
    list: Garden[]
}

export const SET_GARDENS = 'GET_GARDENS';
export const setGardens = (gardens: Garden[]): Payload => {
    return {
        type: SET_GARDENS,
        data: gardens
    }
}

export const getGardens = (userID: string) => {
    return (dispatch: Function) => {
        dispatch(setLoading(true));
        db.get(`gardens/${userID}`).then((data: Garden[]) => {
            console.log(data);
            dispatch(setGardens(data));
            dispatch(setLoading(false));
        });
    }
}