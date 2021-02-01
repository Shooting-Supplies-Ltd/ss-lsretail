import { useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

import BrandFilter from "./BrandFilter"
import CategoryFilter from "./CategoryFilter"
import ConditionFilter from "./ConditionFilter"

const GunFilter = (props) => {
  const [displayConditions, setDisplayConditions] = useState(false)
  const [displayCategories, setDisplayCategories] = useState(false)
  const [displayBrands, setDisplayBrands] = useState(false)

  const toggleDisplayConditions = () => {
    setDisplayConditions(!displayConditions)
  }

  const toggleDisplayCategories = () => {
    setDisplayCategories(!displayCategories)
  }

  const toggleDisplayBrands = () => {
    setDisplayBrands(!displayBrands)
  }

  return (
    <>
      <div className="my-24">
        <div >
          <h4 className="p-2 border-b-2 border-r-2 font-black uppercase text-2xl">Filter By</h4>
          <div className="p-2 my-2 border-r-2 border-b-2" onClick={toggleDisplayConditions}>
            <h5 className="mb-2 font-semibold text-lg uppercase">Condition<span className="ml-2 inline-block align-middle"><MdKeyboardArrowDown /></span></h5>
          </div>
          {displayConditions &&
            <div>
              <ConditionFilter conditions={props.conditions} handleConditionChange={props.handleConditionChange} selectedCondition={props.selectedCondition} />
            </div>
          }
        </div>
        <div>
          <div className="p-2 my-2 border-r-2 border-b-2" onClick={toggleDisplayCategories}>
            <h5 className="mb-2 font-semibold text-lg uppercase">Category<span className="ml-2 inline-block align-middle"><MdKeyboardArrowDown /></span></h5>
          </div>
          {displayCategories &&
            <div>
              <CategoryFilter categories={props.categories} handleCategoryChange={props.handleCategoryChange} selectedCategory={props.selectedCategory} />
            </div>
          }
        </div>
        <div>
          <div className="p-2 my-2 border-r-2 border-b-2" onClick={toggleDisplayBrands}>
            <h5 className="mb-2 font-semibold text-lg uppercase">Brand<span className="ml-2 inline-block align-middle"><MdKeyboardArrowDown /></span></h5>
          </div>
          {displayBrands &&
            <div>
              <BrandFilter brands={props.brands} handleBrandChange={props.handleBrandChange} selectedBrand={props.selectedBrand} />
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default GunFilter