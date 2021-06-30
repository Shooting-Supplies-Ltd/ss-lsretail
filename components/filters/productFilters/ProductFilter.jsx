import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import CategoryFilter from './CategoryFilter';
import BrandFilter from './BrandFilter';
import StockMessage from '../../StockMessage';


const ProductFilter = (props) => {
  return (
  <>
    <div className="border-2 border-gray-300 rounded-lg">
      <div className="flex p-4 border-b-2">
        <h4 className="font-bold uppercase text-xl">Filter By</h4>
        <p role="button" onClick={props.clearFilters} className="ml-16 flex items-end">Clear Filters</p>
      </div>
      <div className="border-b-2">
        <div className="p-4">
          <h5 className="font-semibold uppercase">
            Category
            <span className="ml-2 inline-block align-middle">
              <MdKeyboardArrowDown />
            </span>
          </h5>
        </div>

        <div className="pl-4 pb-4 overflow-y-auto h-64">
          <CategoryFilter
            categories={props.categories}
            handleCategoryChange={props.handleCategoryChange}
            selectedCategory={props.selectedCategory}
          />
        </div>
      </div>
      <div className="border-b-2">
        <div className="p-4">
          <h5 className="font-semibold uppercase">
            Brand
            <span className="ml-2 inline-block align-middle">
              <MdKeyboardArrowDown />
            </span>
          </h5>
        </div>

        <div className="pl-4 pb-4 overflow-y-auto h-64">
          <BrandFilter
            brands={props.brands}
            handleBrandChange={props.handleBrandChange}
            selectedBrand={props.selectedBrand}
          />
        </div>
      </div>
    </div>
    <StockMessage />
  </>
)};
export default ProductFilter;
