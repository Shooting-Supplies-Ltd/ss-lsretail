const BrandFilter = ({ brands, handleBrandChange, selectedBrand }) => (
  <>
    {brands instanceof Array
      ? brands.map((brand) => (
          <div key={brand.brandID} className="mb-2 md:mb-0">
            <div>
              <input
                type="checkbox"
                id={brand.name}
                value={brand.brandID}
                checked={selectedBrand[brand.brandID]}
                onChange={handleBrandChange}
                className="hover:ssorange"
              />
              <label key={brand.name} htmlFor={brand.name} className="ml-1 uppercase">
                {brand.name}
              </label>
            </div>
          </div>
        ))
      : ''}
  </>
);

export default BrandFilter;
