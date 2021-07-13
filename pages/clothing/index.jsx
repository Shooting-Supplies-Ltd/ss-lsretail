import Head from "next/head";
import useLocalStorage from "../../lib/localStorage";
import { useState, useEffect, useRef } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import {
  getClothing,
  getMatrixClothing,
} from "../../adapters/lightspeed/lightspeed";
import { parseCategories, parseBrands } from "../../lib/helpers";

import SearchFilter from "../../components/filters/productFilters/SearchFilter";
import ProductCard from "../../components/product-page/ProductCard";
import ProductFilter from "../../components/filters/productFilters/ProductFilter";
import StockMessage from "../../components/StockMessage";
import MobileProductFilter from "../../components/filters/productFilters/MobileProductFilter";

let routerQueryBrand;
let routerQueryCategory;

export async function getStaticProps() {
  const matrixItemData = await getMatrixClothing();
  // Array of Objects
  const matrixItems = matrixItemData.filter(
    (item) => item.Images && item.Manufacturer
  );

  const singleItemData = await getClothing();
  // Array of Objects
  const singleItems = singleItemData
    .map((item) => {
      if (item.itemMatrixID == 0) {
        return item;
      }
    })
    .filter(Boolean)
    .filter((item) => item.Images && item.Manufacturer);

  const items = [...singleItems, ...matrixItems];

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

const Clothing = ({ items, categories, brands }) => {
  const initialRender = useRef(true);

  const [selectedCategory, setSelectedCategory] = useLocalStorage(
    "clothingCategory",
    {}
  );
  const [selectedBrand, setSelectedBrand] = useLocalStorage(
    "clothingBrand",
    {}
  );
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
          Shooting & Outdoor Clothing for all Conditions | Shooting Supplies Ltd
        </title>
        <meta
          name="description"
          content="Shooting & Outdoor clothing for all weathers and conditions from your favourite brands."
        />
        <link
          rel="canonical"
          href="https://www.shootingsuppliesltd.co.uk/clothing"
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
          <div className="mb-4 xl:hidden text-center">
            <StockMessage />
          </div>
        </div>

        <main>
          <ul className="mt-8 lg:mt-0 grid gap-y-8 md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3 xl:gap-x-6 xl:gap-y-12">
            {filteredItems
              ? filteredItems.map((item) => (
                  <li
                    key={
                      item.itemID ? item.itemID : `${item.itemMatrixID}}matrix`
                    }
                  >
                    <ProductCard item={item} />
                  </li>
                ))
              : items.map((item) => (
                  <li
                    key={
                      item.itemID ? item.itemID : `${item.itemMatrixID}}matrix`
                    }
                  >
                    <ProductCard item={item} />
                  </li>
                ))}
          </ul>
        </main>
      </div>
    </>
  );
};

export default Clothing;
