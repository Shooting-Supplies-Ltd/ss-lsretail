import Head from 'next/head'
import { getMaintenance, getCategories, getManufacturers } from '../api/lightspeed'
import { useState, useEffect, useRef } from 'react'

import Layout from '../../components/layout/Layout'
import SearchFilter from '../../components/filters/productFilters/SearchFilter'
import ProductCard from '../../components/ProductCard'
import ProductFilter from '../../components/filters/productFilters/ProductFilter'

const Maintenance = ({ items, categories, brands }) => {
  const [selectedCategory, setSelectedCategory] = useState({})
  const [selectedBrand, setSelectedBrand] = useState({})
  const [itemFilters, setItemFilters] = useState()
  const [filteredItems, setFilteredItems] = useState()

  const initialRender = useRef(true)

  const handleCategoryChange = (event) => {
    setSelectedCategory({ ...selectedCategory, [event.target.value]: event.target.checked })
  }

  const handleBrandChange = (event) => {
    setSelectedBrand({ ...selectedBrand, [event.target.value]: event.target.checked })
  }

  const handleFilters = () => {
    const appliedFilters = {
      categoryID: [],
      manufacturerID: [],
    }
    for (let CategoryKey in selectedCategory) {
      if (selectedCategory[CategoryKey]) appliedFilters.categoryID.push(CategoryKey)
    }
    for (let BrandKey in selectedBrand) {
      if (selectedBrand[BrandKey]) appliedFilters.manufacturerID.push(BrandKey)
    }
    setItemFilters(appliedFilters)
  }

  const multiPropsFilter = (items, itemFilters) => {
    const filterKeys = Object.keys(itemFilters);
    return items.filter(item => {
      return filterKeys.every(key => {
        if (!itemFilters[key].length) return true
        return itemFilters[key].includes(item[key])
      })
    })
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
      handleFilters()
    }
  }, [selectedBrand])

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
      handleFilters()
    }
  }, [selectedCategory])

  useEffect(() => {
    if (itemFilters != undefined) {
      const myItems = multiPropsFilter(items, itemFilters)
      setFilteredItems(myItems)
    }
  }, [itemFilters])

  return (
    <Layout>
      <Head>
        <title>Maintenance | Cleaning & Maintenance - Shooting Supplies Ltd</title>
      </Head>
      <SearchFilter items={items} setFilteredItems={setFilteredItems} />
      <div className="flex mx-12 my-16">
        <div className="w-1/5 p-2">
          <ProductFilter
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            brands={brands}
            selectedBrand={selectedBrand}
            handleBrandChange={handleBrandChange}
          />
        </div>
        <div className="w-4/5 p-2">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {filteredItems ? filteredItems.map(item => <ProductCard item={item} />) : items.map(item => <ProductCard item={item} />)}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Get Items/Products
  const itemData = await getMaintenance()
  const fetchedItems = await itemData.data
  const items = []
  fetchedItems.Item.map(item => {
    if (item.Images?.Image?.baseImageURL) {
      items.push(item)
    }
  })

  // Get Categories
  const categoryIds = []
  items.map(item => {
    categoryIds.push(item.categoryID)
  })
  const categoriesToFetch = [...new Set(categoryIds)]
  console.log({ categoriesToFetch })
  const categoryData = await getCategories(categoriesToFetch)
  const returnedCategories = await categoryData.data
  const categories = returnedCategories.Category.map(category => {
    return {
      category: {
        catID: category.categoryID,
        name: category.name
      }
    }
  })

  // Get Brands
  const brandIds = []
  items.map(item => {
    brandIds.push(parseInt(item.manufacturerID))
  })
  const brandsToFetch = [...new Set(brandIds)]
  console.log({ brandsToFetch })
  const brandData = await getManufacturers(brandsToFetch)
  const returnedBrands = await brandData.data
  const brands = returnedBrands.Manufacturer.map(brand => {
    return {
      brand: {
        brandID: brand.manufacturerID,
        name: brand.name
      }
    }
  })

  return {
    props: {
      items,
      categories,
      brands
    },
    revalidate: 600
  }
}

export default Maintenance;