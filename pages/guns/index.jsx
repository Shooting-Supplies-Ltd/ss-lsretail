import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

import Layout from '../../components/layout/Layout'
import GunProductCard from '../../components/GunProductCard'
import GunFilter from '../../components/filters/GunFilter'

const Guns = ({ guns, categories, brands }) => {
  const [selectedCategory, setSelectedCategory] = useState({})
  const [selectedBrand, setSelectedBrand] = useState({})
  const [gunFilters, setGunFilters] = useState()
  const [filteredGuns, setFilteredGuns] = useState()

  const initialRender = useRef(true)

  const handleCategoryChange = (event) => {
    setSelectedCategory({ ...selectedCategory, [event.target.value]: event.target.checked })
  }

  const handleBrandChange = (event) => {
    setSelectedBrand({ ...selectedBrand, [event.target.value]: event.target.checked })
  }

  const handleFilters = () => {
    const appliedFilters = {
      Make: [],
      Type: []
    }

    for (let MakeKey in selectedBrand) {
      if (selectedBrand[MakeKey]) appliedFilters.Make.push(MakeKey)
    }
    for (let TypeKey in selectedCategory) {
      if (selectedCategory[TypeKey]) appliedFilters.Type.push(TypeKey)
    }
    setGunFilters(appliedFilters)
  }

  const multiPropsFilter = (guns, gunFilters) => {
    const filterKeys = Object.keys(gunFilters);
    console.log(filterKeys)
    return guns.filter(gun => {
      return filterKeys.every(key => {
        if (!gunFilters[key].length) return true
        return gunFilters[key].includes(gun[key])
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
    if (gunFilters != undefined) {
      console.log({ gunFilters })
      const myGuns = multiPropsFilter(guns, gunFilters)
      setFilteredGuns(myGuns)
    }
  }, [gunFilters])

  useEffect(() => {
    console.log(filteredGuns)
  }, [filteredGuns])

  if (!guns) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-vh">
          <Image src="/loading.gif" width={500} height={300} />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex mx-44 mt-14">
        <div className="w-1/4">
          <GunFilter
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            brands={brands}
            selectedBrand={selectedBrand}
            handleBrandChange={handleBrandChange}
          />
        </div>
        <div className="w-3/4">
          <div className="grid grid-cols-3 gap-2 my-12 justify-center">
            {filteredGuns ? filteredGuns.map(gun => <GunProductCard gun={gun} />) : guns.map(gun => <GunProductCard gun={gun} />)}
          </div>
        </div>
      </div>
    </Layout >
  )
}

export async function getStaticProps() {
  // Get guns
  const res = await fetch(process.env.GUNTRADER_API)
  const data = await res.json()
  const gunData = data.Guns

  const guns = []

  // Filter out guns with no images
  gunData.map(gun => {
    if (gun.ImageCount > 1) {
      guns.push(gun)
    }
  })

  //Get brands for the Gun filter.
  const findBrands = guns.map(gun => {
    return gun.Make
  })
  const filterBrands = findBrands.filter((brand, index) => findBrands.indexOf(brand) === index).sort()
  const brands = filterBrands.map((brand, index) => {
    return {
      brands: {
        brandID: index,
        name: brand
      }
    }
  })

  // Get categories for the category filter
  const findCategories = guns.map(gun => {
    return gun.Type
  })
  const filterCategories = findCategories.filter((category, index) => findCategories.indexOf(category) === index).sort()

  const categories = filterCategories.map((cat, index) => {
    return {
      categories: {
        catID: index,
        name: cat
      }
    }
  })

  return {
    props: {
      guns,
      brands,
      categories
    },
    revalidate: 3600
  }
}

export default Guns