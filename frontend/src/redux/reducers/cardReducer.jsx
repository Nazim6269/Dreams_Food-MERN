import {
  getDataFromLocalStorage,
  getSelectedProduct,
} from "../../helpers/getfromLocalStorage";
import {
  ADD_TO_CART,
  DECREMENT_ITEM,
  FETCH_FAILED,
  FETCH_START,
  FETCH_SUCCESS,
  REMOVE_FROM_CART,
  SELECTED_ITEM,
} from "../actions/actionsTypes";

//initial states
const initialState = {
  isLoading: false,
  isError: null,
  data: [],
  cart: getDataFromLocalStorage(),
  selectedProduct: getSelectedProduct(),
};

//reducer functions
//fetch reducer function
export const fetchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_START:
      return { ...state, isLoading: true };

    case FETCH_SUCCESS:
      return { ...state, isLoading: false, data: payload.payload[1] };

    case FETCH_FAILED:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

//cart reducer function
export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //Add to cart functionality
    case ADD_TO_CART:
      const selectedProduct = state.cart.find(
        (item) => item._id === payload._id
      );

      if (selectedProduct) {
        const updatedCart = state.cart.map((item) => {
          if (item._id === payload._id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });

        if (selectedProduct) {
          const newCart = state.cart.filter(
            (item) => item._id !== selectedProduct._id
          );

          selectedProduct.quantity += 1;

          return {
            ...state,
            cart: updatedCart,
          };
        }
      }
      return { ...state, cart: [...state.cart, { ...payload, quantity: 1 }] };

    //Remove form cart functionality
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== payload),
      };

    //Decrement item in cart page
    case DECREMENT_ITEM:
      let productItem = state.cart.find((item) => item._id === payload);

      if (productItem) {
        const updatedCart = state.cart.map((item) => {
          if (item._id === payload) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });

        return {
          ...state,
          cart: updatedCart,
        };
      }
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== payload),
      };
    default:
      return state;
  }
};

//selcted product reducer
export const selectedItemReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SELECTED_ITEM:
      return {
        ...state,
        selectedProduct: [payload],
      };

    default:
      return state;
  }
};
