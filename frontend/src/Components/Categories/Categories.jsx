import React from "react";
import Category from "../Category/Category";

const Categories = () => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center">
        Food Categories
        <div className="mt-7">
          <Category />
        </div>
      </h2>
    </div>
  );
};

export default Categories;
