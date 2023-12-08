import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLocalCart } from "../helpers/setLocalStorage";
import {
  addToCart,
  decrementItem,
  removeFromCart,
} from "../redux/actions/actionsCreator";

const Cart = () => {
  const { cart } = useSelector((state) => state.cartReducer);
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("");
  const dispatch = useDispatch();

  // Function to calculate the total amount
  const calculateTotal = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      if (item && typeof item === "object") {
        totalPrice += item.options[0].full * item.quantity;
      }
    });
    return totalPrice + 10;
  };

  useEffect(() => {
    setLocalCart(cart);
    setAmount(cart.length);
    setTotal(calculateTotal());
  }, [cart]);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        {/* carts details part */}
        <div className="w-3/4 bg-white px-10 py-10">
          {/* heading  */}
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
          </div>
          {/* sub heading */}
          <div className="flex mt-3">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Total
            </h3>
          </div>
          {/* carts menu */}

          {cart.map((item) => {
            if (!item || typeof item !== "object") {
              return null;
            }
            let { _id, CategoryName, img, quantity } = item;

            const { full } = item.options[0];

            return (
              <div
                key={_id}
                className="flex items-center hover:bg-gray-100  py-4"
              >
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img className="h-18" src={img} alt={CategoryName} />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="text-red-500 font-bold text-md capitalize">
                      {CategoryName}
                    </span>
                    <div
                      onClick={() => dispatch(removeFromCart(_id))}
                      className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
                    >
                      Remove
                    </div>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <svg
                    className="fill-current text-gray-600 w-3 cursor-pointer"
                    viewBox="0 0 448 512"
                    onClick={() => dispatch(decrementItem(_id))}
                  >
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>

                  <div className="mx-2 border text-center w-8" type="text">
                    {quantity}
                  </div>

                  <svg
                    className="fill-current text-gray-600 w-3 cursor-pointer"
                    viewBox="0 0 448 512"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${full}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${full * quantity}
                </span>
              </div>
            );
          })}

          {/* footer button */}
          <Link
            to="/"
            className="flex font-semibold text-pink-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-pink-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* old summary part */}
        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex font-bold text-md uppercase justify-between my-3 ">
            <span>Items</span>
            <span>{amount}</span>
          </div>
          <div>
            <label className="font-medium inline-block text-sm uppercase">
              Shipping
            </label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="py-10">
            <label
              htmlFor="promo"
              className="font-semibold inline-block text-sm uppercase"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full"
            />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>
          <div className="border-t mt-8">
            <div className="flex font-bold justify-between py-6 text-md uppercase">
              <span>Total cost</span>
              <span>{total}$</span>
            </div>
            <button className="bg-pink-500 font-semibold hover:bg-pink-600 py-3 text-sm text-white uppercase w-full">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
