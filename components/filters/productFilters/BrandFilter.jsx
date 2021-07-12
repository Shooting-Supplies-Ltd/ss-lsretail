const BrandFilter = ({ brands, handleBrandChange, selectedBrand }) => (
  <>
    {brands instanceof Array
      ? brands.map((brand) => (
          <li key={brand.brandID} className="mb-2 md:mb-0">
            <input
              type="checkbox"
              id={brand.name}
              value={brand.brandID}
              checked={selectedBrand[brand.brandID]}
              onChange={handleBrandChange}
              className="hover:ssorange"
            />
            <label
              key={brand.name}
              htmlFor={brand.name}
              className="ml-2 text-lg lg:text-base uppercase"
            >
              {brand.name}
            </label>
          </li>
        ))
      : ""}
  </>
);

export default BrandFilter;
