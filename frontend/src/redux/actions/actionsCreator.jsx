import {
  ADD_TO_CART,
  DECREMENT_ITEM,
  FETCH_FAILED,
  FETCH_START,
  FETCH_SUCCESS,
  REMOVE_FROM_CART,
  SELECTED_ITEM,
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

export const decrementItem = (id) => {
  return {
    type: DECREMENT_ITEM,
    payload: id,
  };
};

export const selectItem = (payload) => {
  return {
    type: SELECTED_ITEM,
    payload: payload,
  };
};
