import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setLocalSeclectedProduct } from "../../helpers/setLocalStorage";
import {
  addToCart,
  setSelectProduct,
} from "../../redux/actions/actionsCreator";

const CardDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedProduct } = useSelector(
    (state) => state.selectedProductReducer
  );

  if (!selectedProduct) {
    return <div>Loading</div>;
  }

  const arrData = selectedProduct.filter((item) => item._id === id);
  if (!arrData || arrData.length === 0) {
    return (
      <div className=" h-[55vh] flex justify-center items-center text-4xl">
        Loading...
      </div>
    );
  }

  useEffect(() => {
    dispatch(setSelectProduct(arrData));
    setLocalSeclectedProduct(arrData);
  }, []);

  //handleCart function
  const handleCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <section className="text-black body-font overflow-hidden">
      {arrData?.map((item) => {
        let { _id, img, description, name, CategoryName } = item;
        const { full } = item.options[0];
        return (
          <div key={_id} className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full  h-64 object-cover object-center rounded"
                src={img}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-md font-semibold title-font text-black tracking-widest">
                  {name}
                </h2>
                <h1 className="text-black text-3xl title-font font-medium mb-1">
                  {CategoryName}
                </h1>

                <p className="leading-relaxed">{description}</p>

                <div className="flex">
                  <span className="title-font font-medium text-2xl">
                    Price: ${full}
                  </span>
                  <Link
                    to={"/"}
                    className="flex mx-auto text-white bg-pink-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Go to home
                  </Link>

                  <button
                    onClick={() => handleCart(item)}
                    className="flex ml-auto text-white bg-pink-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Add to cart
                  </button>

                  <Link
                    to={"/cart"}
                    className="flex mx-auto text-white  bg-pink-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Go to cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default CardDetails;
