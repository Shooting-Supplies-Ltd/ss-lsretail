import { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

import BrandFilter from "./BrandFilter";
import CategoryFilter from "./CategoryFilter";

const MobileProductFilter = (props) => {
  const [displayCategories, setDisplayCategories] = useState(() => {
    const stickyValue = localStorage.getItem("categories");
    return stickyValue !== null ? JSON.parse(stickyValue) : false;
  });
  const [displayBrands, setDisplayBrands] = useState(() => {
    const stickyValue = localStorage.getItem("brands");
    return stickyValue !== null ? JSON.parse(stickyValue) : false;
  });

  const toggleDisplayCategories = () => {
    setDisplayCategories(!displayCategories);
  };

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(displayCategories));
  }, [displayCategories]);

  const toggleDisplayBrands = () => {
    setDisplayBrands(!displayBrands);
  };

  useEffect(() => {
    localStorage.setItem("brands", JSON.stringify(displayBrands));
  }, [displayBrands]);

  return (
    <>
      <div className="absolute bg-ssblue w-full text-white z-10 border-2 border-gray-300">
        <div className="flex justify-between p-4 border-b border-white">
          <h4 className="flex font-bold uppercase text-xl">Filter By</h4>
          <button
            onClick={props.clearFilters}
            className="ml-32 flex items-end bg-ssblue hover:bg-black text-white border py-1 px-2 ring-1 ring-white rounded"
          >
            Clear Filters
          </button>
        </div>
        <div className="border-b-2">
          <div className="p-4" onClick={toggleDisplayCategories}>
            <h5 className="font-semibold uppercase">
              Category
              <span className="ml-2 inline-block align-middle">
                <MdKeyboardArrowDown />
              </span>
            </h5>
          </div>
          {displayCategories && (
            <ul className="pl-4 pb-4 overflow-y-auto h-64 list-none">
              <CategoryFilter
                categories={props.categories}
                handleCategoryChange={props.handleCategoryChange}
                selectedCategory={props.selectedCategory}
              />
            </ul>
          )}
        </div>
        <div className="border-b-2">
          <div className="p-4" onClick={toggleDisplayBrands}>
            <h5 className="font-semibold uppercase">
              Brand
              <span className="ml-2 inline-block align-middle">
                <MdKeyboardArrowDown />
              </span>
            </h5>
          </div>
          {displayBrands && (
            <ul className="pl-4 pb-4 overflow-y-auto h-64 list-none">
              <BrandFilter
                brands={props.brands}
                handleBrandChange={props.handleBrandChange}
                selectedBrand={props.selectedBrand}
              />
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileProductFilter;
