import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { getOptics, getCategory, getManufacturers } from '../api/lightspeed';

import Layout from '../../components/layout/Layout';
import SearchFilter from '../../components/filters/productFilters/SearchFilter';
import ProductCard from '../../components/ProductCard';
import ProductFilter from '../../components/filters/productFilters/ProductFilter';
import StockMessage from '../../components/StockMessage';

export async function getStaticProps() {
  // Get Items/Products
  const itemData = await getOptics();

  const items = itemData.data.Item.map((item) => {
    if (item.Images?.Image?.baseImageURL) {
      return item;
    }
  });

  // Get Categories
  const categoryIds = items.map((item) => item.categoryID);

  const categoriesToFetch = [...new Set(categoryIds)];
  const categoryData = await getCategory(categoriesToFetch);
  const categories = categoryData.data.Category.map((category) => ({
    category: {
      catID: category.categoryID,
      name: category.name,
    },
  }));

  // Get Brands
  const brandIds = items.map((item) => item.manufacturerID);

  const brandsToFetch = [...new Set(brandIds)];
  const brandData = await getManufacturers(brandsToFetch);
  const brands = brandData.data.Manufacturer.map((brand) => ({
    brand: {
      brandID: brand.manufacturerID,
      name: brand.name,
    },
  }));

  // Return props
  return {
    props: {
      items,
      categories,
      brands,
    },
    revalidate: 60,
  };
}

const Optics = ({ items, categories, brands }) => {
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedBrand, setSelectedBrand] = useState({});
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
    <Layout>
      <Head>
        <title>From Spotters to Night Vision | Shooting Supplies Ltd</title>
        <meta name="description" content="We stock a full range of optics from spotters to night vision" />
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
    </Layout>
  );
};

export default Optics;
