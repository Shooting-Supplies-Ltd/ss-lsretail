const BrandFilter = (props) => {
  const { brands, handleBrandChange, selectedBrand } = props;

  return (
    <>
      {brands.map((brand) => (
        <li className="mb-2 md:mb-0" key={brand.brands.name}>
          <input
            type="checkbox"
            id={brand.brands.name}
            value={brand.brands.name}
            checked={selectedBrand[brand.brands.name]}
            onChange={handleBrandChange}
            className="hover:ssorange"
          />
          <label
            key={brand.brands.name}
            htmlFor={brand.brands.name}
            className="ml-1 uppercase"
          >
            {brand.brands.name}
          </label>
        </li>
      ))}
    </>
  );
};

export default BrandFilter;
