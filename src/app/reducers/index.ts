import { combineReducers } from "redux";
import plants from '../plants/reducer';
import garden from '../gardens/reducer';

export default combineReducers({
    plants,
    garden
});