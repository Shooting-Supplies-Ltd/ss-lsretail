import slugify from 'slugify'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import GunProductCard from '../components/GunProductCard'
import GunFilter from '../components/GunFilter'

const Guns = (props) => {
  const guns = props.guns

  const getCategories = guns.map(gun => {
    return gun.Type
  })

  const filterCategories = getCategories.filter((category, index) => getCategories.indexOf(category) === index)

  const categories = filterCategories.map((cat, index) => {
    return {
      id: index,
      name: cat
    }
  })

  const [checkedInputs, setCheckedInputs] = useState({})

  const handleInputChange = (event) => {
    setCheckedInputs({ ...checkedInputs, [event.target.value]: event.target.checked })
  }

  useEffect(() => {
    console.log('Checked Inputs', checkedInputs)
  }, [checkedInputs])

  return (
    <Layout>
      <div className="flex mx-96">
        <div className="w-1/4">
          <GunFilter categories={categories} handleInputChange={handleInputChange} checkedInputs={checkedInputs} />
        </div>
        <div className="w-3/4">
          <div className="grid grid-cols-3 gap-2 lg:my-12 lg:justify-center">
            {guns.map(gun => {
              if (gun.ImageCount > 1) {
                if (Object.keys(checkedInputs).length < 1 || Object.keys(checkedInputs).every(value => checkedInputs[value] === false)) {
                  return <GunProductCard gun={gun} />
                }
                for (const [key, value] of Object.entries(checkedInputs)) {
                  if (value === true) {
                    if (categories.id === key) {
                      return <GunProductCard gun={gun} />
                    }
                  }
                }
              }
            })}
            {/* {guns.map(gun => {
              if (gun.ImageCount > 1) {
                return (
                  <div key={gun.ID}>
                    <GunProductCard gun={gun} />
                  </div>
                )
              }
            })} */}
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
    }
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