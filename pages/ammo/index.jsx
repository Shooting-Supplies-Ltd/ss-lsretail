import Head from 'next/head'
import { getAmmo, getCategories, getManufacturers } from '../api/lightspeed'
import { useState, useEffect, useRef } from 'react'

import Layout from '../../components/layout/Layout'
import SearchFilter from '../../components/filters/productFilters/SearchFilter'
import ProductCard from '../../components/ProductCard'
import ProductFilter from '../../components/filters/productFilters/ProductFilter'

const Ammo = ({ items, categories, brands }) => {
  const [selectedCategory, setSelectedCategory] = useState({})
  const [selectedBrand, setSelectedBrand] = useState({})
  const [itemFilters, setItemFilters] = useState()
  const [filteredItems, setFilteredItems] = useState()

  const initialRender = useRef(true)

  const handleCategoryChange = (event) => {
    setSelectedCategory({ ...selectedCategory, [event.target.value]: event.target.checked })
  }

  const handleBrandChange = (event) => {
    console.log(event.target)
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
      console.log({ BrandKey })
      if (selectedBrand[BrandKey]) appliedFilters.manufacturerID.push(BrandKey)
    }
    setItemFilters(appliedFilters)
  }

  const multiPropsFilter = (items, itemFilters) => {
    const filterKeys = Object.keys(itemFilters);
    console.log({ filterKeys })
    return items.filter(item => {
      return filterKeys.every(key => {
        if (!itemFilters[key].length) return true
        console.log('itemKey:', item[key])
        return itemFilters[key].includes(item[key])
      })
    })
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
      console.log(selectedBrand)
      handleFilters()
    }
  }, [selectedBrand])

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
      console.log(selectedCategory)
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
        <title>Ammo - Shooting Supplies Ltd</title>
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
  const itemData = await getAmmo()
  const fetchedItems = await itemData.data
  const items = []
  fetchedItems.Item.map(item => {
    if (item.Images?.Image?.baseImageURL) {
      items.push(item)
    }
  })

  // Get Categories
  const categoriesToFetch = []
  const findCategories = items.map(item => {
    categoriesToFetch.push(item.categoryID)
  })
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
  const brandsToFetch = []
  const findBrands = items.map(item => {
    brandsToFetch.push(item.manufacturerID)
  })
  const brandData = await getManufacturers()
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

export default Ammo;