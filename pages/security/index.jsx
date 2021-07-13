import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { getSecurity } from "../../adapters/lightspeed/lightspeed";
import { parseCategories, parseBrands } from "../../lib/helpers";
import useLocalStorage from "../../lib/localStorage";

import SearchFilter from "../../components/filters/productFilters/SearchFilter";
import ProductCard from "../../components/product-page/ProductCard";
import ProductFilter from "../../components/filters/productFilters/ProductFilter";
import StockMessage from "../../components/StockMessage";

export async function getStaticProps() {
  const itemData = await getSecurity().catch((err) => console.error(err));
  const items = itemData.filter((item) => item.Images && item.Manufacturer);

  const categories = parseCategories(items);
  const brands = parseBrands(items);

  return {
    props: {
      items,
      categories,
      brands,
    },
    revalidate: 300,
  };
}

const Security = ({ items, categories, brands }) => {
  const [selectedCategory, setSelectedCategory] = useLocalStorage(
    "securityCategory",
    {}
  );
  const [selectedBrand, setSelectedBrand] = useLocalStorage(
    "securityBrand",
    {}
  );
  const [itemFilters, setItemFilters] = useState();
  const [filteredItems, setFilteredItems] = useState();
  const [displayMobileFilter, setDisplayMobileFilter] = useState(false);

  const initialRender = useRef(true);

  const clearFilters = () => {
    localStorage.clear();
    setSelectedBrand({});
    setSelectedCategory({});
    window.location.reload(false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory({
      ...selectedCategory,
      [event.target.value]: event.target.checked,
    });
  };

  const handleBrandChange = (event) => {
    setSelectedBrand({
      ...selectedBrand,
      [event.target.value]: event.target.checked,
    });
  };

  const handleFilters = () => {
    const appliedFilters = {
      categoryID: [],
      manufacturerID: [],
    };
    for (const CategoryKey in selectedCategory) {
      if (selectedCategory[CategoryKey])
        appliedFilters.categoryID.push(CategoryKey);
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
        <title>Security - Gun & Ammo Safes from Brattonsound</title>
        <meta
          name="description"
          content="Make sure everythiing is secured with our range of security products"
        />
        <link
          rel="canonical"
          href="https://www.shootingsuppliesltd.co.uk/security"
        />
      </Head>
      <SearchFilter items={items} setFilteredItems={setFilteredItems} />

      <div
        role="navigation"
        className="xl:hidden flex justify-center items-center h-12 bg-ssblue text-white border-b border-ssblue"
        onClick={handleMobileFilter}
      >
        FILTERS
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
      </div>

      <div className="flex justify-center lg:mx-4 lg:my-12 xl:mx-20">
        <div className="hidden xl:block px-4 max-w-sm">
          <ProductFilter
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            brands={brands}
            selectedBrand={selectedBrand}
            handleBrandChange={handleBrandChange}
            clearFilters={clearFilters}
          />
          <div className="mb-4 xl:hidden text-center">
            <StockMessage />
          </div>
        </div>

        <main>
          <ul className="mt-8 lg:mt-0 grid gap-y-8 md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3 xl:gap-x-6 xl:gap-y-12">
            {filteredItems
              ? filteredItems.map((item) => (
                  <li key={item.customSku}>
                    <ProductCard item={item} />
                  </li>
                ))
              : items.map((item) => (
                  <li key={item.customSku}>
                    <ProductCard item={item} />
                  </li>
                ))}
          </ul>
        </main>
      </div>
    </>
  );
};

export default Security;
