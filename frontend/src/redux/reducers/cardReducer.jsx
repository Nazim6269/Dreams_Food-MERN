import {
  getLocalCart,
  getLocalProfile,
  getLocalSeclectedProduct,
} from "../../helpers/setLocalStorage";
import {
  ADD_TO_CART,
  FETCH_FAILED,
  FETCH_START,
  FETCH_SUCCESS,
  REMOVE_FROM_CART,
  SELECTED_PRODUCT,
  SET_PROFILE_INFO,
} from "../actions/actionsTypes";

//initial states
const initialState = {
  isLoading: false,
  isError: null,
  data: [],
  cart: getLocalCart(),
  profile: getLocalProfile(),
  selectedProduct: getLocalSeclectedProduct(),
};

//reducer functions
export const fetchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_START:
      return { isLoading: true };

    case FETCH_SUCCESS:
      return { ...state, isLoading: false, data: payload.payload[1] };

    case FETCH_FAILED:
      return { isLoading: false, isError: true };
    default:
      return state;
  }
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      const selectedProduct = state.cart.find(
        (item) => item._id === payload._id
      );
      if (selectedProduct) {
        const newCart = state.cart.filter(
          (item) => item._id !== selectedProduct._id
        );

        selectedProduct.quantity = selectedProduct.quantity + 1;
        return {
          cart: [...newCart, selectedProduct],
        };
      }
      return { ...state, cart: [...state.cart, { ...payload, quantity: 1 }] };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== payload),
      };

    default:
      return state;
  }
};

export const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PROFILE_INFO:
      return {
        ...state,
        profile: payload,
      };

    default:
      return state;
  }
};

export const selectedProductReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: payload,
      };

    default:
      return state;
  }
};
