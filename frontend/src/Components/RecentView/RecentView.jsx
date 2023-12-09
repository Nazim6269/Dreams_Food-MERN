import React from "react";

const RecentView = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container mx-auto">
        <h1 className="text-xl title-font font-medium mb-1 text-pink-600">
          Recently Viewed
        </h1>
        <div className="mx-auto flex items-center">
          <img
            alt="ecommerce"
            className="w-8 h-8 rounded-full object-cover object-center "
            src=""
          />
          <div className=" ">
            <h1 className="text-gray-900 text-md title-font font-medium mb-1">
              The Catcher in the Rye
            </h1>

            <div className="flex">
              <span className="title-font font-medium text-xl text-gray-900">
                $58.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentView;
