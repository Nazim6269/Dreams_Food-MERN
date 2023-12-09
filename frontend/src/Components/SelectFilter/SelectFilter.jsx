import React from "react";

const SelectFilter = () => {
  return (
    <div>
      <h2 className="font-semibold text-xl">Selec filter</h2>
      <div className="flex flex-col">
        <div className="flex gap-2 items-center my-2">
          <input type="checkbox" className="" name="" id="" />
          <label htmlFor="name">In Stock</label>
        </div>
        <div className="flex gap-2 items-center my-2">
          <input type="checkbox" name="" id="" />
          <label htmlFor="name">Without Stock</label>
        </div>
        <div className="flex gap-2 items-center my-2">
          <input type="checkbox" />
          <label htmlFor="name">Upcoming</label>
        </div>
      </div>
    </div>
  );
};

export default SelectFilter;
