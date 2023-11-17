import { combineReducers } from "redux";
import {
  cartReducer,
  fetchReducer,
  profileReducer,
  selectedProductReducer,
} from "./cardReducer";

export const rootReducer = combineReducers({
  fetchReducer,
  cartReducer,
  profileReducer,
  selectedProductReducer,
});
