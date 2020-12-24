import { GardensState, SET_GARDENS } from "../actions/gardens";
import { Payload } from "../actions/types";

const initialState: GardensState = {
    list: []
};

export default (state : GardensState = initialState, payload: Payload = { type: '', data: {} }): GardensState => {
    if (payload.type === SET_GARDENS) {
        return {
            ...state,
            list: payload.data
        };
    }
    return {
        ...state
    };
}