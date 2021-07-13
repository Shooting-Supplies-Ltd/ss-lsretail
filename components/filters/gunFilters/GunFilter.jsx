import { MdKeyboardArrowDown } from "react-icons/md";
import useLocalStorage from "../../../lib/localStorage";

import BrandFilter from "./BrandFilter";
import CategoryFilter from "./CategoryFilter";
import ConditionFilter from "./ConditionFilter";
import MechanismFilter from "./MechanismFilter";

const GunFilter = (props) => {
  const [displayConditions, setDisplayConditions] = useLocalStorage(
    "displayConditionsGun",
    true
  );
  const [displayCategories, setDisplayCategories] = useLocalStorage(
    "displayCategoriesGuns",
    true
  );
  const [displayBrands, setDisplayBrands] = useLocalStorage(
    "displayBrandsGuns",
    true
  );
  const [displayMechanisms, setDisplayMechanisms] = useLocalStorage(
    "displayMechanismsGuns",
    true
  );

  const toggleDisplayConditions = () => {
    setDisplayConditions(!displayConditions);
  };

  const toggleDisplayCategories = () => {
    setDisplayCategories(!displayCategories);
  };

  const toggleDisplayBrands = () => {
    setDisplayBrands(!displayBrands);
  };

  const toggleDisplayMechanisms = () => {
    setDisplayMechanisms(!displayMechanisms);
  };

  return (
    <>
      <div className="border-r border-ssblue">
        <div className="flex p-4 border-b border-ssblue">
          <h4 className="font-bold uppercase text-xl">Filter By</h4>
          <button
            role="button"
            onClick={props.clearFilters}
            className="ml-16 flex items-end bg-ssblue hover:bg-blue-700 text-white py-1 px-2 rounded"
          >
            Clear Filters
          </button>
        </div>
        <div className="border-b border-ssblue">
          <div className="p-4" onClick={toggleDisplayConditions}>
            <h5 className="font-semibold uppercase">
              Condition
              <span className="ml-2 inline-block align-middle">
                <MdKeyboardArrowDown />
              </span>
            </h5>
          </div>
          {displayConditions && (
            <ul className="pl-4 pb-4">
              <ConditionFilter
                conditions={props.conditions}
                handleConditionChange={props.handleConditionChange}
                selectedCondition={props.selectedCondition}
              />
            </ul>
          )}
        </div>
        <div className="border-b border-ssblue">
          <div className="p-4" onClick={toggleDisplayCategories}>
            <h5 className="font-semibold uppercase">
              Category
              <span className="ml-2 inline-block align-middle">
                <MdKeyboardArrowDown />
              </span>
            </h5>
          </div>
          {displayCategories && (
            <ul className="pl-4 pb-4">
              <CategoryFilter
                categories={props.categories}
                handleCategoryChange={props.handleCategoryChange}
                selectedCategory={props.selectedCategory}
              />
            </ul>
          )}
        </div>
        <div className="border-b border-ssblue">
          <div className="p-4" onClick={toggleDisplayBrands}>
            <h5 className="font-semibold uppercase">
              Brand
              <span className="ml-2 inline-block align-middle">
                <MdKeyboardArrowDown />
              </span>
            </h5>
          </div>
          {displayBrands && (
            <ul className="pl-4 pb-4 overflow-y-auto h-64">
              <BrandFilter
                brands={props.brands}
                handleBrandChange={props.handleBrandChange}
                selectedBrand={props.selectedBrand}
              />
            </ul>
          )}
        </div>
        <div>
          <div className="p-4" onClick={toggleDisplayMechanisms}>
            <h5 className="font-semibold uppercase">
              Mechanism
              <span className="ml-2 inline-block align-middle">
                <MdKeyboardArrowDown />
              </span>
            </h5>
          </div>
          {displayMechanisms && (
            <ul className="pl-4 pb-4 overflow-y-auto h-64">
              <MechanismFilter
                mechanisms={props.mechanisms}
                handleMechanismChange={props.handleMechanismChange}
                selectedMechanism={props.selectedMechanism}
              />
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default GunFilter;
