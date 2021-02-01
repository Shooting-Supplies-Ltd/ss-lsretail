const BrandFilter = (props) => {
  const { brands, handleBrandChange, selectedBrand } = props

  return (
    <div className="p-2 my-2 border-r-2 border-b-2">
      <h5 className="mb-2 font-semibold uppercase">Brand</h5>
      {brands.map(brand => {
        return (
          <div className="hover:text-ssorange my-1">
            <input type="checkbox" id={brand.brands.name} value={brand.brands.name} checked={selectedBrand[brand.brands]} onChange={handleBrandChange} className="hover:ssorange" />
            <label key={brand.brands.name} className="ml-2" htmlFor={brand.brands.name} className="ml-2">{brand.brands.name}</label>
          </div>
        )
      })}
    </div>
  )
}

export default BrandFilter