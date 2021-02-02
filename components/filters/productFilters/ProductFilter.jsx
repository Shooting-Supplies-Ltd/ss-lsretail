import { useState } from "react"
import { MdKeyboardArrowDown } from 'react-icons/md'

import CategoryFilter from './CategoryFilter'
import BrandFilter from './BrandFilter'

const ProductFilter = (props) => {
  const [displayCategories, setDisplayCategories] = useState(true)
  const [displayBrands, setDisplayBrands] = useState(false)

  const toggleDisplayCategories = () => {
    setDisplayCategories(!displayCategories)
  }

  const toggleDisplayBrands = () => {
    setDisplayBrands(!displayBrands)
  }

  return (
    <>
      <div className="border-2 border-gray-300 rounded-lg">
        <h4 className="p-4 font-bold uppercase text-xl border-b-2">Filter By</h4>
        <div className="border-b-2">
          <div className="p-4" onClick={toggleDisplayCategories}>
            <h5 className="font-semibold uppercase">Category<span className="ml-2 inline-block align-middle"><MdKeyboardArrowDown /></span></h5>
          </div>
          {displayCategories &&
            <div className="pl-4 pb-4">
              <CategoryFilter categories={props.categories} handleCategoryChange={props.handleCategoryChange} selectedCategory={props.selectedCategory} />
            </div>
          }
        </div>
        <div className="border-b-2">
          <div className="p-4" onClick={toggleDisplayBrands}>
            <h5 className="font-semibold uppercase">Brand<span className="ml-2 inline-block align-middle"><MdKeyboardArrowDown /></span></h5>
          </div>
          {displayBrands &&
            <div className="pl-4 pb-4 overflow-y-auto h-64">
              <BrandFilter brands={props.brands} handleBrandChange={props.handleBrandChange} selectedBrand={props.selectedBrand} />
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default ProductFilter