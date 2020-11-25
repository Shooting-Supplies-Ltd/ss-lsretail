import slugify from 'slugify'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Layout from '../../components/layout/Layout'
import GunProductCard from '../../components/GunProductCard'
import GunFilter from '../../components/filters/GunFilter'

const Guns = (props) => {
  const { guns } = props

  if (!guns) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-vh">
          <Image src="/loading.gif" width={500} height={300} />
        </div>
      </Layout>
    )
  }

  const [checkedInputs, setCheckedInputs] = useState({})

  const handleInputChange = (event) => {
    setCheckedInputs({ ...checkedInputs, [event.target.value]: event.target.checked })
  }

  useEffect(() => {
    console.log('Checked Inputs', checkedInputs)
  }, [checkedInputs])


  // Get categories for the Gun filter.
  const getCategories = () => {
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

    return categories
  }


  //Get brands for the Gun filter.
  const getBrands = () => {
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

    return brands
  }



  return (
    <Layout>
      <div className="flex mx-96">
        <div className="w-1/4">
          <GunFilter categories={getCategories()} brands={getBrands()} handleInputChange={handleInputChange} checkedInputs={checkedInputs} />
        </div>
        <div className="w-3/4">
          <div className="grid grid-cols-3 gap-2 lg:my-12 lg:justify-center">
            {guns.map(gun => {
              if (gun.ImageCount > 1) {
                // If no options boxes selected
                if (Object.keys(checkedInputs).length < 1 || Object.keys(checkedInputs).every(value => checkedInputs[value] === false)) {
                  console.log(checkedInputs)
                  return <GunProductCard gun={gun} />
                }
                for (const [key, value] of Object.entries(checkedInputs)) {
                  if (value === true) {
                    if (key === gun.Type || key === gun.Make) {
                      return (
                        <GunProductCard gun={gun} />
                      )
                    }
                  }
                }
              }
            })}
          </div>
        </div>
      </div>
    </Layout >
  )
}

export async function getStaticProps() {
  const res = await fetch(process.env.GUNTRADER_API)
  const data = await res.json()
  const guns = data.Guns

  return {
    props: {
      guns
    },
    revalidate: 600
  }
}

// export async function getStaticPaths() {
//   const res = await fetch(process.env.GUNTRADER_API)
//   const guns = await res.json()



//   const paths = guns.Guns.map(gun => {
//     const title = slugify(`${gun.Make}${gun.Model}${gun.SerialNumber}`)

//       ({ params: { id: title } })

//     return { paths, fallback: false }
//   })
// }

export default Guns