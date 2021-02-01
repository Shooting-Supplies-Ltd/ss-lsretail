import Layout from '../../components/layout/Layout'
import ProductCard from '../../components/ProductCard'
import ProductFilter from '../../components/ProductFilter'
import { getCategories, getAmmo } from '../api/lightspeed'
import { useState, useEffect } from 'react'

const Ammo = (props) => {
  const { items } = props
  const { Category } = props.categories

  const [checkedInputs, setCheckedInputs] = useState({})

  const handleInputChange = (event) => {
    setCheckedInputs({ ...checkedInputs, [event.target.value]: event.target.checked })
  }

  useEffect(() => {
    // console.log('Checked Inputs', checkedInputs)
  }, [checkedInputs])

  return (
    <Layout>
      <div className="flex mx-44 mt-14">
        <div className="w-1/4">
          <ProductFilter category={Category} handleInputChange={handleInputChange} checkedInputs={checkedInputs} />
        </div>
        <div className="w-3/4">
          <div className="lg:grid grid-cols-3 gap-2 lg:my-12 lg:justify-center">
            {items.map(item => {
              if (Object.keys(checkedInputs).length < 1 || Object.keys(checkedInputs).every(value => checkedInputs[value] === false)) {
                return <ProductCard item={item} key={item.itemID} />
              }
              for (const [key, value] of Object.entries(checkedInputs)) {
                if (value === true) {
                  if (item.categoryID === key) {
                    return <ProductCard item={item} key={item.itemID} />
                  }
                }
              }
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const itemData = await getAmmo()
  const fetchedItems = await itemData.data

  const items = []

  fetchedItems.Item.map(item => {
    if (item.Images.Image.baseImageURL) {
      items.push(item)
    }
  })


  const categoriesToFetch = []

  const findCategories = items.map(item => {
    categoriesToFetch.push(item.categoryID)
  })

  const categoryData = await getCategories(categoriesToFetch)
  const categories = await categoryData.data

  return {
    props: {
      items,
      categories
    }
  }
}

export default Ammo;