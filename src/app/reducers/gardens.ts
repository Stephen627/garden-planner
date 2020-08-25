import { GardensState } from "../actions/gardens";

const initialState: GardensState = {};

export default (state : GardensState = initialState): GardensState => {
    return {
        ...state
    };
}