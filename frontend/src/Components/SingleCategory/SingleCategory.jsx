import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import RangeFilter from "../RangeFilter/RangeFilter";
import SelectFilter from "../SelectFilter/SelectFilter";

const SingleCategory = () => {
  const { data } = useSelector((state) => state.fetchReducer);
  const { filteredRange } = useSelector((state) => state.filterReducer);
  const { id } = useParams();

  if (!data) {
    return (
      <div className=" h-[55vh] flex justify-center items-center text-4xl">
        Loading...
      </div>
    );
  }

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const initialFilteredData = data.filter((item) => item.CategoryName === id);
    setFilteredData(initialFilteredData);
  }, [data]);

  // useEffect(() => {
  //   const filteredPriceData = filteredData.filter((item) => {
  //     const itemPrice = parseFloat(item.options[0].half);
  //     return (
  //       itemPrice >= filteredRange.minValue &&
  //       itemPrice <= filteredRange.maxValue
  //     );
  //   });
  //   setFilteredData(filteredPriceData);
  //   console.log(filteredData, "2");
  // }, [filteredRange]);

  // console.log(filteredData, "3");

  if (!filteredData.length) {
    return (
      <div className=" h-[55vh] flex justify-center items-center text-4xl">
        No items match the selected price range.
      </div>
    );
  }
  return (
    <>
      <div className="flex">
        <div className="px-2 py-3 ">
          <div className="mb-2 px-2 py-3 bg-gray-400 rounded">
            <RangeFilter />
          </div>
          <div className=" px-2 py-3 bg-gray-400 rounded">
            <SelectFilter />
          </div>
          <div className="my-2 px-2 py-3 bg-gray-400 rounded">
            <SelectFilter />
          </div>
          <div className=" px-2 py-3 bg-gray-400 rounded">
            <SelectFilter />
          </div>
        </div>
        <div>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-3 mx-auto">
              <div className="flex justify-between items-center bg-gray-300">
                <h2 className="text-3xl  mb-3 pl-2 py-3 rounded font-bold">
                  {id}
                </h2>
                <div className="flex gap-3 mr-7">
                  <div>
                    <label htmlFor="name" className="mr-2 font-semibold">
                      Show:
                    </label>
                    <select name="" id="">
                      <option value="20">20</option>
                      <option value="20">30</option>
                      <option value="20">50</option>
                    </select>
                  </div>
                  <div className="">
                    <label htmlFor="name" className="mr-2 font-semibold">
                      Sort By
                    </label>
                    <select name="" id="">
                      <option value="">Default</option>
                      <option value="">Price(Low to high)</option>
                      <option value="">Price(High to low)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                {filteredData.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="lg:w-1/4 md:w-1/2 p-4 w-full"
                    >
                      <a className="block relative h-48 rounded overflow-hidden">
                        <img
                          alt="ecommerce"
                          className="object-cover object-center w-full h-full block"
                          src={item.img}
                        />
                      </a>
                      <div className="mt-4">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                          {item.CategoryName}
                        </h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                          The Catalyzer
                        </h2>
                        <p className="mt-1">Tk-{item.options[0].half}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleCategory;
