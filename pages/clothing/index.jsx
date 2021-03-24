import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { getMatrixClothing, getCategory, getManufacturers } from '../../adapters/lightspeed/lightspeed';

import Layout from '../../components/layout/Layout';
import SearchFilter from '../../components/filters/productFilters/SearchFilter';
import ProductCard from '../../components/ProductCard';
import ProductFilter from '../../components/filters/productFilters/ProductFilter';
import StockMessage from '../../components/StockMessage';

let routerQueryBrand;
let routerQueryCategory;

export async function getStaticProps() {
  // Get Items/Products
  const itemData = await getMatrixClothing().catch((err) => console.err(err));

  const items = itemData.data.ItemMatrix.map((item) => {
    if (item.Images?.Image?.baseImageURL) {
      return item;
    }
  }).filter((item) => item);

  // Get Categories
  const categoryIds = items.map((item) => item.categoryID);

  const categoriesToFetch = [...new Set(categoryIds)];
  const categoryData = await getCategory(categoriesToFetch);
  const returnedCategories = await categoryData.data;
  const categories = returnedCategories.Category.map((category) => ({
    catID: category.categoryID,
    name: category.name,
  }));

  // Get Brands
  const brandIds = items.map((item) => parseInt(item.manufacturerID));

  const brandsToFetch = [...new Set(brandIds)];
  const brandData = await getManufacturers(brandsToFetch);
  const brands = brandData.data.Manufacturer.map((brand) => ({
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
    revalidate: 300,
  };
}

const Clothing = ({ items, categories, brands }) => {
  const router = useRouter();
  const initialRender = useRef(true);

  // Implement useConstructor to load function before initial render.
  const useConstructor = (callBack = () => {}) => {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) return;
    callBack();
    hasBeenCalled.current = true;
  };

  // Get and set Query Brand if set
  const initialBrand = () => {
    const queryValue = router.asPath.match(new RegExp(`[&?]${'brand'}=(.*)(&|$)`));
    if (queryValue) {
      const filterQueryBrand = brands
        .map((queryBrand) => {
          if (queryBrand.name === queryValue[1])
            return {
              [queryBrand.brandID]: true,
            };
        })
        .filter(Boolean);
      routerQueryBrand = filterQueryBrand[0];
    }
  };

  // Get and set Query Category if set
  const initialCategory = () => {
    const queryValue = router.asPath.match(new RegExp(`[&?]${'category'}=(.*)(&|$)`));
    if (queryValue) {
      const filterQueryCategory = categories
        .map((queryCategory) => {
          if (queryCategory.name === queryValue[1])
            return {
              [queryCategory.catID]: true,
            };
        })
        .filter(Boolean);
      routerQueryCategory = filterQueryCategory[0];
    }
  };

  useConstructor(initialBrand);
  useConstructor(initialCategory);

  const [selectedCategory, setSelectedCategory] = useState(routerQueryCategory || {});
  const [selectedBrand, setSelectedBrand] = useState(routerQueryBrand || {});
  const [itemFilters, setItemFilters] = useState();
  const [filteredItems, setFilteredItems] = useState();

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
    <Layout>
      <Head>
        <title>Shooting & Outdoor Clothing for all Conditions | Shooting Supplies Ltd</title>
        <meta
          name="description"
          content="Shooting & Outdoor clothing for all weathers and conditions from the biggest brands."
        />
        <link rel="canonical" href="https://www.shootingsuppliesltd.co.uk/clothing" />
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
              ? filteredItems.map((item) => (
                  <div key={item.itemID}>
                    <ProductCard item={item} />
                  </div>
                ))
              : items.map((item) => (
                  <div key={item.itemID}>
                    <ProductCard item={item} />
                  </div>
                ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Clothing;
