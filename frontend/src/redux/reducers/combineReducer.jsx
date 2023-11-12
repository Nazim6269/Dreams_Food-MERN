import { combineReducers } from "redux";
import { cartReducer, fetchReducer } from "./cardReducer";

export const rootReducer = combineReducers({ fetchReducer, cartReducer });
