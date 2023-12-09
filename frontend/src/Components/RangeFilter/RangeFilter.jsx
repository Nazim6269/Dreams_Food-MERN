import React, { useState } from "react";
import "./rangeFilter.css";
import Slider from "react-slider";
const MIN = 100;
const MAX = 1000000;

const RangeFilter = () => {
  const [values, setValues] = useState([MIN, MAX]);
  const handleChange = (values) => {
    setValues(values);
  };
  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Price Range</h1>

      <Slider
        onChange={handleChange}
        className={"slider my-4 w-full"}
        value={values}
        min={MIN}
        max={MAX}
      />
      <div className="flex gap-3 justify-between">
        <div className="border w-20 text-center ">{values[0]}</div>
        <div className="border w-20 text-center">{values[1]}</div>
      </div>
    </div>
  );
};

export default RangeFilter;
