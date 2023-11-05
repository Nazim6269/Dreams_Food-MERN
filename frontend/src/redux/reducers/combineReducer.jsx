import { combineReducers } from "redux";
import { cartReducer, fetchReducer, selectedItemReducer } from "./cardReducer";

export const rootReducer = combineReducers({
  fetchReducer,
  cartReducer,
  selectedItemReducer,
});
