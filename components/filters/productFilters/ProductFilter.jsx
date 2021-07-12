import { MdKeyboardArrowDown } from "react-icons/md";

import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFilter";
import StockMessage from "../../StockMessage";

const ProductFilter = (props) => {
  return (
    <>
      <div className="border-r border-ssblue">
        <div className="flex p-4 border-b border-ssblue">
          <h4 className="flex justify-start font-bold uppercase text-xl">
            Filter By
          </h4>
          <p
            role="button"
            onClick={props.clearFilters}
            className="ml-32 flex items-end"
          >
            Clear Filters
          </p>
        </div>
        <div className="border-b border-ssblue">
          <div className="p-4">
            <h5 className="font-semibold uppercase">
              Category
              <span className="ml-2 inline-block align-middle">
                <MdKeyboardArrowDown />
              </span>
            </h5>
          </div>
          <ul className="pl-4 pb-4 overflow-y-auto h-64">
            <CategoryFilter
              categories={props.categories}
              handleCategoryChange={props.handleCategoryChange}
              selectedCategory={props.selectedCategory}
            />
          </ul>
        </div>
        <div className="border-b border-ssblue">
          <div className="p-4">
            <h5 className="font-semibold uppercase">
              Brand
              <span className="ml-2 inline-block align-middle">
                <MdKeyboardArrowDown />
              </span>
            </h5>
          </div>
          <ul className="pl-4 pb-4 overflow-y-auto h-64">
            <BrandFilter
              brands={props.brands}
              handleBrandChange={props.handleBrandChange}
              selectedBrand={props.selectedBrand}
            />
          </ul>
        </div>
      </div>
      <StockMessage />
    </>
  );
};
export default ProductFilter;
