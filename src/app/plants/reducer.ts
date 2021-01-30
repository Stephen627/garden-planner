import { PlantsState, SET_PLANTS } from "./actions";
import { Payload } from "../actions/types";

const initialState: PlantsState = {
    list: []
};

export default (state: PlantsState = initialState, payload: Payload = { type: '', data: {} }): PlantsState => {
    if (payload.type === SET_PLANTS) {
        return {
            ...state,
            list: payload.data
        };
    }
    
    return {
        ...state
    };
}