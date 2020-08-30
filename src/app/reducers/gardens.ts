import { GardensState, SET_GARDENS } from "../actions/gardens";
import { Payload } from "../actions/types";

const initialState: GardensState = {
    list: []
};

export default (state : GardensState = initialState, payload: Payload): GardensState => {
    switch (payload.type) {
        case SET_GARDENS:
            return {
                ...state,
                list: payload.data
            }
        default:
            return {
                ...state
            }
    }
}