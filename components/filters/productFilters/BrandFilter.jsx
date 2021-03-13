import { useRouter } from 'next/router';

const BrandFilter = ({ brands, handleBrandChange, selectedBrand }) => (
  <>
    {brands.map((brand) => (
      <div>
        <div>
          <input
            type="checkbox"
            id={brand.name}
            value={brand.brandID}
            checked={selectedBrand[brand]}
            onChange={handleBrandChange}
            className="hover:ssorange"
          />
          <label key={brand.name} htmlFor={brand.name} className="ml-1 uppercase">
            {brand.name}
          </label>
        </div>
      </div>
    ))}
  </>
);

export default BrandFilter;
