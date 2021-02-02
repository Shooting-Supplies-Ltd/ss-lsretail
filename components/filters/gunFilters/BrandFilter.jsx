const BrandFilter = (props) => {
  const { brands, handleBrandChange, selectedBrand } = props

  return (
    <>
      {brands.map(brand => {
        return (
          <div>
            <div>
              <input type="checkbox" id={brand.brands.name} value={brand.brands.name} checked={selectedBrand[brand.brands]} onChange={handleBrandChange} className="hover:ssorange" />
              <label key={brand.brands.name} htmlFor={brand.brands.name} className="ml-2 uppercase">{brand.brands.name}</label>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default BrandFilter