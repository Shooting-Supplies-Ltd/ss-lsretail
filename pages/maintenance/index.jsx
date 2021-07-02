import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { getMaintenance } from "../../adapters/lightspeed/lightspeed";
import { getCategories, getBrands } from "../../lib/helpers";
import useLocalStorage from "../../lib/localStorage";

import SearchFilter from "../../components/filters/productFilters/SearchFilter";
import ProductCard from "../../components/product-page/ProductCard";
import ProductFilter from "../../components/filters/productFilters/ProductFilter";
import StockMessage from "../../components/StockMessage";
import MobileProductFilter from "../../components/filters/productFilters/MobileProductFilter";

let routerQueryBrand;
let routerQueryCategory;

export async function getStaticProps() {
  const itemData = await getMaintenance().catch((err) => console.error(err));
  const items = itemData.filter((item) => item.Images && item.Manufacturer);

  const categories = getCategories(items);
  const brands = getBrands(items);

  return {
    props: {
      items,
      categories,
      brands,
    },
    revalidate: 300,
  };
}

const Maintenance = ({ items, categories, brands }) => {
  const initialRender = useRef(true);

  const [selectedCategory, setSelectedCategory] = useLocalStorage(
    "maintenanceCategory",
    {}
  );
  const [selectedBrand, setSelectedBrand] = useLocalStorage(
    "maintenanceBrand",
    {}
  );
  const [itemFilters, setItemFilters] = useState();
  const [filteredItems, setFilteredItems] = useState();
  const [displayMobileFilter, setDisplayMobileFilter] = useState(false);

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
    setDisplayMobileFilter(false);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand({
      ...selectedBrand,
      [event.target.value]: event.target.checked,
    });
    setDisplayMobileFilter(false);
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
        <title>
          Gun Cleaning Kits & Chemicals & Supplies | Shooting Supplies Ltd
        </title>
        <meta
          name="description"
          content="Gun cleaning cloths, chemicals and kits from all of your favourite brands."
        />
        <link
          rel="canonical"
          href="https://www.shootingsuppliesltd.co.uk/maintenance"
        />
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
      <div className="flex lg:mx-20 xl:my-16">
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
        </div>

        <div className="mb-4 xl:hidden text-center">
          <StockMessage />
        </div>

        <main>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-12">
            {filteredItems
              ? filteredItems.map((item) => (
                  <ProductCard item={item} key={item.itemID} />
                ))
              : items.map((item) => (
                  <ProductCard item={item} key={item.customSku} />
                ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Maintenance;
