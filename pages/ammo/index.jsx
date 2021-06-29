import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { getAmmo, getCategory, getManufacturer } from '../../adapters/lightspeed/lightspeed';

import SearchFilter from '../../components/filters/productFilters/SearchFilter';
import ProductCard from '../../components/ProductCard';
import ProductFilter from '../../components/filters/productFilters/ProductFilter';
import StockMessage from '../../components/StockMessage';
import MobileProductFilter from '../../components/filters/productFilters/MobileProductFilter';

let routerQueryBrand;
let routerQueryCategory;

export async function getStaticProps() {
  // Get Items/Products
  const itemData = await getAmmo();
  
  const items = itemData.filter(item => item.Images)

  // Get Categories for filter
  const categoryIds = items.map((item) => item.categoryID).filter(Boolean);

  const categoriesToFetch = [...new Set(categoryIds)];
  const categoryData = await getCategory(categoriesToFetch);
  const categories = categoryData.map((category) => ({
    catID: category.categoryID,
    name: category.name,
  }));

  // Get Brands
  const brandIds = items.map((item) => item.manufacturerID);

  const brandsToFetch = [...new Set(brandIds)];
  const brandData = await getManufacturer(brandsToFetch);
  const brands = brandData.map((brand) => ({
    brandID: brand.manufacturerID,
    name: brand.name,
  }));

  // Return props
  return {
    props: {
      items,
      categories,
      brands,
    },
    revalidate: 300
  };
}

const Ammo = ({ items, categories, brands }) => {
  const initialRender = useRef(true);

  const [selectedCategory, setSelectedCategory] = useState(routerQueryCategory || {});
  const [selectedBrand, setSelectedBrand] = useState(routerQueryBrand || {});
  const [itemFilters, setItemFilters] = useState();
  const [filteredItems, setFilteredItems] = useState();
  const [displayMobileFilter, setDisplayMobileFilter] = useState(false);

  const handleCategoryChange = (event) => {
    setSelectedCategory({ ...selectedCategory, [event.target.value]: event.target.checked });
    setDisplayMobileFilter(false);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand({ ...selectedBrand, [event.target.value]: event.target.checked });
    setDisplayMobileFilter(false);
  };

  const handleFilters = () => {
    const appliedFilters = {
      categoryID: [],
      manufacturerID: [],
    };
    for (const CategoryKey in selectedCategory) {
      if (selectedCategory[CategoryKey]) appliedFilters.categoryID.push(CategoryKey);
    }
    for (const BrandKey in selectedBrand) {
      if (selectedBrand[BrandKey]) appliedFilters.manufacturerID.push(BrandKey);
    }
    setItemFilters(appliedFilters);
  };

  const handleMobileFilter = () => {
    setDisplayMobileFilter(!displayMobileFilter);
    setSelectedBrand({});
    setSelectedCategory({});
  };

  const multiPropsFilter = (items, itemFilters) => {
    const filterKeys = Object.keys(itemFilters);
    return items.filter((item) =>
      filterKeys.every((key) => {
        if (!itemFilters[key].length) return true;
        return itemFilters[key].includes(item[key]);
      })
    );
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      handleFilters();
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      handleFilters();
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (itemFilters != undefined) {
      const myItems = multiPropsFilter(items, itemFilters);
      setFilteredItems(myItems);
    }
  }, [itemFilters]);

  return (
    <>
      <Head>
        <title>Ammunition for Rifles, Shotguns & Airguns | Shooting Supplies Ltd</title>
        <meta name="description" content="All the ammunition you need whatever the use with bulk discounts available." />
        <link rel="canonical" href="https://www.shootingsuppliesltd.co.uk/ammo" />
      </Head>
      <SearchFilter items={items} setFilteredItems={setFilteredItems} />
      <div
        role="navigation"
        className="flex justify-center items-center xl:hidden h-12 bg-ssblue text-white border-b border-ssblue"
        onClick={handleMobileFilter}
      >
        FILTERS
      </div>
      <>
        {displayMobileFilter && (
          <div>
            <MobileProductFilter
              categories={categories}
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
              brands={brands}
              selectedBrand={selectedBrand}
              handleBrandChange={handleBrandChange}
            />
          </div>
        )}
      </>
      <div className="flex mx-12 my-4 xl:my-16">
        <div className="hidden xl:block xl:w-1/6 p-2">
          <ProductFilter
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            brands={brands}
            selectedBrand={selectedBrand}
            handleBrandChange={handleBrandChange}
          />
        </div>
        <main className="xl:w-5/6 p-2">
          <div className="mb-4 xl:hidden text-center">
            <StockMessage />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
            {filteredItems
              ? filteredItems.map((item) => <ProductCard item={item} key={item.customSku} />)
              : items.map((item) => <ProductCard item={item} key={item.customSku} />)}
          </div>
        </main>
      </div>
    </>
  );
};

export default Ammo;
