const BrandFilter = ({ brands, handleBrandChange, selectedBrand }) => {
  return (
    <>
      {brands.map(brand => {
        return (
          <div>
            <div>
              <input type="checkbox" id={brand.brand.name} value={brand.brand.brandID} checked={selectedBrand[brand.brand]} onChange={handleBrandChange} className="hover:ssorange" />
              <label key={brand.brand.name} htmlFor={brand.brand.name} className="ml-1 uppercase">{brand.brand.name}</label>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default BrandFilter