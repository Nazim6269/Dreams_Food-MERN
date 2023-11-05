import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link, useParams } from "react-router-dom";
import { setSelectedProduct } from "../../helpers/getfromLocalStorage";
import { addToCart } from "../../redux/actions/actionsCreator";

const CardDetails = () => {
  const { selectedProduct } = useSelector((state) => state.selectedItemReducer);

  useEffect(() => {
    setSelectedProduct(selectedProduct);
  }, [selectedProduct]);

  const isTablet = useMediaQuery({ query: "(max-width: 480px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 350px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 650px)" });
  const isDesktop = useMediaQuery({
    query: "(max-width: 1224px)",
  });

  const { id } = useParams();
  //const { selectedProduct } = useSelector((state) => state.selectedItemReducer);
  const dispatch = useDispatch();

  if (!selectedProduct) {
    return <div>Loading</div>;
  }

  //handleCart function
  const handleCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <section className="text-black body-font overflow-hidden">
      {selectedProduct?.map((item) => {
        let { _id, img, description, name, CategoryName } = item;
        const { full } = item.options[0];
        return (
          <div key={_id} className="container px-5 py-24 mx-auto">
            <div className={"mx-auto flex flex-wrap"}>
              <img
                alt="ecommerce"
                className={
                  "lg:w-1/2 w-full  h-64 object-cover object-center rounded"
                }
                src={img}
              />
              <div className={"lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"}>
                <h2 className="text-md font-semibold title-font text-black tracking-widest">
                  {name}
                </h2>
                <h1 className="text-black text-3xl title-font font-medium mb-1">
                  {CategoryName}
                </h1>

                <p className="leading-relaxed">{description}</p>

                <div
                  className={
                    isTablet
                      ? "flex flex-col justify-start"
                      : isLaptop
                      ? "flex flex-row "
                      : "flex"
                  }
                >
                  <div className="title-font font-medium text-2xl">
                    Price: ${full}
                  </div>
                  <div
                    className={
                      isLaptop
                        ? "flex"
                        : isDesktop
                        ? "flex mx-auto"
                        : "flex mx-auto"
                    }
                  >
                    <Link
                      to={"/"}
                      className={
                        isMobile
                          ? "flex px-2 py-2 text-white items-center capitalize text-xs rounded text-center mr-1 font-semibold bg-pink-600"
                          : isTablet
                          ? "flex items-center py-2 px-2 text-white bg-pink-600 border-0  focus:outline-none rounded"
                          : isLaptop
                          ? "flex items-center px-2 ml-2 text-sm text-white bg-pink-600 border-0 focus:outline-none rounded"
                          : isDesktop
                          ? "flex items-center text-white bg-pink-600 border-0 py-1 px-2 focus:outline-none rounded"
                          : "flex  text-white bg-pink-600 border-0 py-2 px-2 focus:outline-none rounded"
                      }
                    >
                      Go to home
                    </Link>

                    <button
                      onClick={() => handleCart(item)}
                      className={
                        isMobile
                          ? "flex px-2 py-2 text-white items-center capitalize text-xs rounded mr-1 font-semibold bg-pink-600"
                          : isTablet
                          ? "flex items-center py-2 px-2 mx-1 text-white bg-pink-600 border-0  focus:outline-none rounded"
                          : isLaptop
                          ? "flex items-center px-2 mx-2 text-sm text-white bg-pink-600 border-0 focus:outline-none rounded"
                          : isDesktop
                          ? "flex  items-center text-white bg-pink-600 border-0 py-1 px-2 mx-2 focus:outline-none rounded"
                          : "flex  text-white bg-pink-600 border-0 py-2 px-2 mx-2 focus:outline-none  rounded"
                      }
                    >
                      Add to cart
                    </button>

                    <Link
                      to={"/cart"}
                      className={
                        isMobile
                          ? "flex px-2 py-2 text-white items-center capitalize text-xs rounded text-center mr-1 font-semibold bg-pink-600"
                          : isTablet
                          ? "flex items-center py-2 px-2 mx-1 text-white bg-pink-600 border-0  focus:outline-none rounded"
                          : isLaptop
                          ? "flex items-center px-2 text-sm text-white bg-pink-600 border-0 focus:outline-none rounded"
                          : isDesktop
                          ? "flex items-center text-white bg-pink-600 border-0 py-1 px-2 focus:outline-none  rounded"
                          : "flex  text-white bg-pink-600 border-0 py-2 px-2 focus:outline-none rounded"
                      }
                    >
                      Go to cart
                    </Link>
                  </div>
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
