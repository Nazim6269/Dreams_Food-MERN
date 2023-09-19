import {
  ADD_TO_CART,
  FETCH_FAILED,
  FETCH_START,
  FETCH_SUCCESS,
  REMOVE_FROM_CART,
} from "./actionsTypes";

//action creators
export const startFetch = () => {
  return {
    type: FETCH_START,
  };
};

export const successFetch = (data) => {
  return {
    type: FETCH_SUCCESS,
    payload: data,
  };
};

export const failedFetch = () => {
  return {
    type: FETCH_FAILED,
  };
};

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload: payload,
  };
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};
