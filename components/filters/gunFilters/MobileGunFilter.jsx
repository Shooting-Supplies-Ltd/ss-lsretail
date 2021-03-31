import { useState, useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import BrandFilter from './BrandFilter';
import CategoryFilter from './CategoryFilter';
import ConditionFilter from './ConditionFilter';

const MobileGunFilter = (props) => {
  const [displayConditions, setDisplayConditions] = useState(() => {
    const stickyValue = localStorage.getItem('conditions');
    return stickyValue !== null ? JSON.parse(stickyValue) : false;
  });

  const [displayCategories, setDisplayCategories] = useState(() => {
    const stickyValue = localStorage.getItem('categories');
    return stickyValue !== null ? JSON.parse(stickyValue) : false;
  });
  const [displayBrands, setDisplayBrands] = useState(() => {
    const stickyValue = localStorage.getItem('brands');
    return stickyValue !== null ? JSON.parse(stickyValue) : false;
  });

  const toggleDisplayConditions = () => {
    setDisplayConditions(!displayConditions);
  };

  useEffect(() => {
    localStorage.setItem('conditions', JSON.stringify(displayConditions));
  }, [displayConditions]);

  const toggleDisplayCategories = () => {
    setDisplayCategories(!displayCategories);
  };

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(displayCategories));
  }, [displayCategories]);

  const toggleDisplayBrands = () => {
    setDisplayBrands(!displayBrands);
  };

  useEffect(() => {
    localStorage.setItem('brands', JSON.stringify(displayBrands));
  }, [displayBrands]);

  return (
    <>
      <div className="absolute bg-ssblue w-full text-white z-10 border-2 border-gray-300 rounded-lg">
        <h4 className="p-4 font-bold uppercase text-xl border-b-2">Filter By</h4>
        <div className="border-b-2">
          <div className="p-4" onClick={toggleDisplayConditions}>
            <h5 className="font-semibold uppercase">
              Condition
              <span className="ml-2 inline-block align-middle">
                <MdKeyboardArrowDown />
              </span>
            </h5>
          </div>
          {displayConditions && (
            <div className="pl-4 pb-4">
              <ConditionFilter
                conditions={props.conditions}
                handleConditionChange={props.handleConditionChange}
                selectedCondition={props.selectedCondition}
              />
            </div>
          )}
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
            <div className="pl-4 pb-4">
              <CategoryFilter
                categories={props.categories}
                handleCategoryChange={props.handleCategoryChange}
                selectedCategory={props.selectedCategory}
              />
            </div>
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
            <div className="pl-4 pb-4 overflow-y-auto h-64">
              <BrandFilter
                brands={props.brands}
                handleBrandChange={props.handleBrandChange}
                selectedBrand={props.selectedBrand}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileGunFilter;
