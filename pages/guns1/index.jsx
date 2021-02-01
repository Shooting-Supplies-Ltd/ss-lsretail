import Layout from '../../components/layout/Layout'
import ProductCard from '../../components/ProductCard'
import ProductFilter from '../../components/ProductFilter'
import { getGuns } from '../api/gun-trader'
import { useState, useEffect } from 'react'

const Guns = (props) => {
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
  const itemData = await getGuns()
  const fetchedItems = await itemData.data

  const items = []
  const filteredCategories = []

  fetchedItems.Guns.map(item => {
    if (item.ImageCount >= 2) {
      items.push({
        itemID: item.ID,
        systemSku: item.StockNumber,
        customSku: item.StockNumber,
        description: item.Variant ? `${item.Make} ${item.Model} ${item.Variant}` : `${item.Make} ${item.Model}`,
        Category: {
          name: item.Type
        },
        Images: {
          Image: {
            FullPath: item.Images[0].FullPath
          }
        },
        ItemECommerce: {
          shortDescription: item.Variant ? `${item.Condition} ${item.Make} ${item.Model} ${item.Variant}` : `${item.Condition} ${item.Make} ${item.Model}`,
          longDescription: item.Description
        },
        Prices: {
          ItemPrice: [
            {
              amount: item.Price
            }
          ]
        }
      })
    }
  })

  const findCategories = items.map(item => {
    return item.Category.name
  })

  const filterCategories = findCategories.filter((category, index) => findCategories.indexOf(category) === index)

  const newCategories = filterCategories.map((cat, index) => {
    filteredCategories.push({
      categoryID: index,
      name: cat
    })
  })

  const categories = { Category: filteredCategories }

  return {
    props: {
      items,
      categories
    }
  }
}

export default Guns;