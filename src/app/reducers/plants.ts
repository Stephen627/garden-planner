import { PlantsState } from "../actions/plants";

const initialState: PlantsState = {};

export default (state: PlantsState = initialState): PlantsState => {
    return {
        ...state
    };
}