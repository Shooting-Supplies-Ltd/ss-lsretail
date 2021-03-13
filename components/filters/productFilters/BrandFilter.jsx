import { useRouter } from 'next/router';

const BrandFilter = ({ brands, handleBrandChange, selectedBrand }) => {
  const { query } = useRouter();
  console.log(query.brand);

  const initialValue = brands.map((brand) => {
    const { brandID } = brand.brand;
    const { name } = brand.brand;
    console.log(name);

    if (query.brand === name) {
      return brandID;
    }
  });

  console.log({ initialValue });

  return (
    <>
      {brands.map((brand) => (
        <div>
          <div>
            <input
              type="checkbox"
              id={brand.brand.name}
              value={brand.brand.brandID}
              checked={selectedBrand[brand.brand]}
              onChange={handleBrandChange}
              className="hover:ssorange"
            />
            <label key={brand.brand.name} htmlFor={brand.brand.name} className="ml-1 uppercase">
              {brand.brand.name}
            </label>
          </div>
        </div>
      ))}
    </>
  );
};

export default BrandFilter;
