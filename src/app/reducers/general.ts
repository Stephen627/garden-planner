import { GeneralState, SET_LOADING, SET_ERROR } from "../actions/general";
import { Payload } from '../actions/types';

const initialState: GeneralState = {
    loading: false,
    error: null
};

export default (state : GeneralState = initialState, payload: Payload): GeneralState => {
    switch (payload.type) {
        case SET_ERROR:
            return {
                ...state,
                error: payload.data
            }
        case SET_LOADING:
            return {
                ...state,
                loading: payload.data
            };
        default:
            return {
                ...state
            };
    };
}