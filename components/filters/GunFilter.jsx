import BrandFilter from "./BrandFilter"
import CategoryFilter from "./CategoryFilter"

const GunFilter = (props) => {
  return (
    <>
      <div className="text-black my-24">
        <h4 className="p-2 border-b-2 border-r-2 font-black uppercase text-xl">Filter By</h4>
        <CategoryFilter categories={props.categories} handleCategoryChange={props.handleCategoryChange} selectedCategory={props.selectedCategory} />
        <BrandFilter brands={props.brands} handleBrandChange={props.handleBrandChange} selectedBrand={props.selectedBrand} />
      </div>
    </>
  )
}

export default GunFilter