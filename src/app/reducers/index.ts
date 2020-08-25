import { combineReducers } from "redux";
import plants from './plants';
import garden from './gardens';

export default combineReducers({
    plants,
    garden
});