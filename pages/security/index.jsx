import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { getSecurity } from '../../adapters/lightspeed/lightspeed';
import { getCategories, getBrands } from '../../lib/helpers';

import SearchFilter from '../../components/filters/productFilters/SearchFilter';
import ProductCard from '../../components/ProductCard';
import ProductFilter from '../../components/filters/productFilters/ProductFilter';
import StockMessage from '../../components/StockMessage';

export async function getStaticProps() {
  const itemData = await getSecurity().catch((err) => console.error(err));
  const items = itemData.filter(item => item.Images && item.Manufacturer)

  const categories = getCategories(items)
  const brands = getBrands(items)

  return {
    props: {
      items,
      categories,
      brands,
    },
    revalidate: 300
  };
}

const Security = ({ items, categories, brands }) => {
  const [selectedCategory, setSelectedCategory] = useLocalStorage('securityCategory', {});
  const [selectedBrand, setSelectedBrand] = useLocalStorage('securityBrand', {});
  const [itemFilters, setItemFilters] = useState();
  const [filteredItems, setFilteredItems] = useState();

  const initialRender = useRef(true);

  const handleCategoryChange = (event) => {
    setSelectedCategory({ ...selectedCategory, [event.target.value]: event.target.checked });
  };

  const handleBrandChange = (event) => {
    setSelectedBrand({ ...selectedBrand, [event.target.value]: event.target.checked });
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
        <title>Security - Gun & Ammo Safes from Brattonsound</title>
        <meta name="description" content="Make sure everythiing is secured with our range of security products" />
        <link rel="canonical" href="https://www.shootingsuppliesltd.co.uk/security" />
      </Head>
      <SearchFilter items={items} setFilteredItems={setFilteredItems} />
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

export default Security;
