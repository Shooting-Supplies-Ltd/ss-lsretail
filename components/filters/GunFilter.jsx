const GunFilter = (props) => {
  const { categories, brands, handleInputChange, checkedInputs } = props

  return (
    <div className="text-black my-24">
      <h4 className="p-2 border-b-2 border-r-2 font-black uppercase text-xl">Filter By</h4>
      <div className="p-2 my-2 border-r-2 border-b-2">
        <h5 className="mb-2 font-semibold uppercase">Category</h5>
        {categories.map(cat => {
          return (
            <div className="hover:text-ssorange my-1">
              <input type="checkbox" id={cat.categories.name} value={cat.categories.name} checked={checkedInputs[cat.categories]} onChange={handleInputChange} className="hover:ssorange" />
              <label key={cat.categories.name} className="ml-2" htmlFor={cat.categories.name} className="ml-2">{cat.categories.name}</label>
            </div>
          )
        })}
      </div>
      {/* <div className="p-2 my-2 border-r-2 border-b-2">
        <h5 className="mb-2 font-semibold">Brand</h5>
        {brands.map(brand => {
          return (
            <div>
              <input type="checkbox" id={brand.brands.name} value={brand.brands.name} checked={checkedInputs[brand.brands.name]} onChange={handleInputChange} />
              <label key={brand.brands.name} className="ml-2" htmlFor={brand.brands.name}>{brand.brands.name}</label>
            </div>
          )
        })}
      </div> */}
    </div>
  )
}

export default GunFilter