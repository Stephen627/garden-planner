import { setLoading } from "../actions/general"
import Plant from "../utils/database/plant";
import { db } from "../utils/db";
import { Payload } from "../actions/types";

export interface PlantsState {
    list: Plant[]
}

export const SET_PLANTS = 'SET_PLANTS';
export const setPlants = (plants: Plant[]): Payload => {
    return {
        type: SET_PLANTS,
        data: plants
    }
}

export const updatePlants = (userID: string, plants: Plant[]) => {
    return (dispatch: Function) => {
        dispatch(setLoading(true));
        db.set(`plants/${userID}`, plants).then(() => {
            dispatch(getPlants(userID));
            dispatch(setLoading(false));
        });
    }
}

export const getPlants = (userID: string) => {
    return (dispatch: Function) => {
        dispatch(setLoading(true));
        db.get(`plants/${userID}`).then((data: Plant[]) => {
            dispatch(setPlants(data));
            dispatch(setLoading(false));
        });
    }
}