import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import Layout from '../../components/layout/Layout'
import GunFilter from '../../components/filters/gunFilters/GunFilter'
import SearchFilter from '../../components/filters/gunFilters/SearchFilter'
import GunProductCard from '../../components/GunProductCard'

const Guns = ({ guns, categories, brands, conditions, mechanisms }) => {
  const [selectedCategory, setSelectedCategory] = useState({})
  const [selectedBrand, setSelectedBrand] = useState({})
  const [selectedCondition, setSelectedCondition] = useState({})
  const [selectedMechanism, setSelectedMechanism] = useState({})
  const [gunFilters, setGunFilters] = useState()
  const [filteredGuns, setFilteredGuns] = useState()

  const initialRender = useRef(true)

  const handleCategoryChange = (event) => {
    setSelectedCategory({ ...selectedCategory, [event.target.value]: event.target.checked })
  }

  const handleBrandChange = (event) => {
    setSelectedBrand({ ...selectedBrand, [event.target.value]: event.target.checked })
  }

  const handleConditionChange = (event) => {
    setSelectedCondition({ ...selectedCondition, [event.target.value]: event.target.checked })
  }

  const handleMechanismChange = (event) => {
    setSelectedMechanism({ ...selectedMechanism, [event.target.value]: event.target.checked })
  }

  const handleFilters = () => {
    const appliedFilters = {
      Make: [],
      Type: [],
      Condition: [],
      Mechanism: []
    }

    for (let MakeKey in selectedBrand) {
      if (selectedBrand[MakeKey]) appliedFilters.Make.push(MakeKey)
    }
    for (let TypeKey in selectedCategory) {
      if (selectedCategory[TypeKey]) appliedFilters.Type.push(TypeKey)
    }
    for (let ConditionKey in selectedCondition) {
      if (selectedCondition[ConditionKey]) appliedFilters.Condition.push(ConditionKey)
    }
    for (let MechanismKey in selectedMechanism) {
      if (selectedMechanism[MechanismKey]) appliedFilters.Mechanism.push(MechanismKey)
    }
    setGunFilters(appliedFilters)
  }

  const multiPropsFilter = (guns, gunFilters) => {
    const filterKeys = Object.keys(gunFilters);
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
    if (initialRender.current) {
      initialRender.current = false
    } else {
      handleFilters()
    }
  }, [selectedCondition])

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
      handleFilters()
    }
  }, [selectedMechanism])

  useEffect(() => {
    if (gunFilters != undefined) {
      const myGuns = multiPropsFilter(guns, gunFilters)
      setFilteredGuns(myGuns)
    }
  }, [gunFilters])

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
      <Head>
        <title>Guns - Shooting Supplies Ltd</title>
      </Head>
      <SearchFilter guns={guns} setFilteredGuns={setFilteredGuns} />
      <div className="flex mx-12 my-16">
        <div className="w-1/5 p-2">
          <GunFilter
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            brands={brands}
            selectedBrand={selectedBrand}
            handleBrandChange={handleBrandChange}
            conditions={conditions}
            selectedCondition={selectedCondition}
            handleConditionChange={handleConditionChange}
            mechanisms={mechanisms}
            selectedMechanism={selectedMechanism}
            handleMechanismChange={handleMechanismChange}
          />
        </div>
        <div className="w-4/5 p-2">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
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

  // Get condition for the condition filter
  const findCondition = guns.map(gun => {
    return gun.Condition
  })
  const filterCondition = findCondition.filter((condition, index) => findCondition.indexOf(condition) === index).sort()
  const conditions = filterCondition.map((condition, index) => {
    return {
      condition: {
        conID: index,
        name: condition
      }
    }
  })

  // Get Mechanisms
  const findMechanism = guns.map(gun => {
    return gun.Mechanism
  })
  const filterMechanism = findMechanism.filter((mechanism, index) => findMechanism.indexOf(mechanism) === index).sort()
  const mechanisms = filterMechanism.map((mechanism, index) => {
    return {
      mechanism: {
        mechID: index,
        name: mechanism
      }
    }
  })

  return {
    props: {
      guns,
      brands,
      categories,
      conditions,
      mechanisms
    },
    revalidate: 3600
  }
}

export default Guns