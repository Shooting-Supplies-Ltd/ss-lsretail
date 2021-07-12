import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { getAmmo } from "../../adapters/lightspeed/lightspeed";
import { getCategories, getBrands } from "../../lib/helpers";
import useLocalStorage from "../../lib/localStorage";
import { FaArrowCircleUp } from "react-icons/fa";

import SearchFilter from "../../components/filters/productFilters/SearchFilter";
import ProductCard from "../../components/product-page/ProductCard";
import ProductFilter from "../../components/filters/productFilters/ProductFilter";
import StockMessage from "../../components/StockMessage";
import MobileProductFilter from "../../components/filters/productFilters/MobileProductFilter";

export async function getStaticProps() {
  const itemData = await getAmmo();
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

const Ammo = ({ items, categories, brands }) => {
  const initialRender = useRef(true);

  const [selectedCategory, setSelectedCategory] = useLocalStorage(
    "ammoCategory",
    {}
  );
  const [selectedBrand, setSelectedBrand] = useLocalStorage("ammoBrand", {});
  const [itemFilters, setItemFilters] = useState();
  const [filteredItems, setFilteredItems] = useState();
  const [displayMobileFilter, setDisplayMobileFilter] = useState(false);
  const [showScroll, setShowScroll] = useState();

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 200) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 200) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    return window.addEventListener("scroll", checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          Ammunition for Rifles, Shotguns & Airguns | Shooting Supplies Ltd
        </title>
        <meta
          name="description"
          content="All the ammo you need whether Hunting, Clay or Target Shooting."
        />
        <link
          rel="canonical"
          href="https://www.shootingsuppliesltd.co.uk/ammo"
        />
      </Head>
      <div className="hidden lg:flex lg:mx-60 lg:mt-8 cursor-pointer">
        <FaArrowCircleUp
          className="scrollTop lg:text-4xl xl:text-5xl text-ssblue"
          onClick={scrollTop}
          style={{
            height: 60,
            display: showScroll ? "flex" : "none",
            position: "fixed",
            bottom: "30px",
            right: "60px",
          }}
        />
      </div>

      <SearchFilter items={items} setFilteredItems={setFilteredItems} />

      <div
        role="navigation"
        className="xl:hidden flex justify-center items-center h-12 bg-ssblue text-white border-b border-ssblue"
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
        </div>

        <main>
          <ul className="mt-8 lg:mt-0 grid gap-y-8 md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3 xl:gap-x-6 xl:gap-y-12">
            {/* <div className="p-4 xl:hidden text-center">
              <StockMessage />
            </div> */}
            {filteredItems
              ? filteredItems.map((item) => (
                  <li key={item.itemID}>
                    <ProductCard item={item} key={item.customSku} />
                  </li>
                ))
              : items.map((item) => (
                  <li key={item.itemID}>
                    <ProductCard item={item} key={item.customSku} />
                  </li>
                ))}
          </ul>
        </main>
      </div>
    </>
  );
};

export default Ammo;
