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
        db.set(`${userID}/plants`, plants).then(() => {
            dispatch(getPlants(userID));
            dispatch(setLoading(false));
        });
    }
}

export const addPlant = (userId: string, plant: Plant) => {
    return (dispatch: Function) => {
        dispatch(setLoading(true));
        db.push(`${userId}/plants`, plant).then(() => {
            dispatch(getPlants(userId));
            dispatch(setLoading(false));
        });
    }
}

export const getPlants = (userID: string) => {
    return (dispatch: Function) => {
        dispatch(setLoading(true));
        db.get(`${userID}/plants`).then((data: Plant[]) => {
            dispatch(setPlants(data));
            dispatch(setLoading(false));
        });
    }
}