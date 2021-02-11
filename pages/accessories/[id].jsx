import { getAccessories, getItem } from '../api/lightspeed'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout'

export async function getStaticPaths() {
  const data = await getAccessories().catch(err => console.error(err))
  const pathData = JSON.parse(data.data?.Item)

  if (pathData) {
    const paths = await pathData.map(item => ({
      params: { id: item.itemID }
    }))

    return { paths, fallback: true }
  } else {
    return null
  }
}

export async function getStaticProps({ params: { id } }) {
  const itemData = await getItem(id)
  const item = await itemData.data?.Item

  return {
    props: { item },
    revalidate: 300
  }
}

const Item = ({ item }) => {
  const router = useRouter()
  // const product = {
  //   name: item.description,
  //   description: item.ItemECommerce ? item.ItemECommerce.longDescription : '',
  //   shortDescription: item.ItemECommerce ? item.ItemECommerce.shortDescription : '',
  //   sku: item.customSku,
  //   price: item.Prices.ItemPrice[0].amount.replace('.', ''),
  //   currency: 'GBP',
  //   image: `${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.jpg`,
  //   itemID: item.itemID,
  //   unitPrice: item.Prices.ItemPrice[0].amount,
  // }

  if (!item) {
    return (
      <div>Loading...</div>
    )
  }

  const productDescriptionLong = () => {
    return { __html: item.ItemECommerce ? item.ItemECommerce.longDescription : '' }
  }

  const productDescriptionShort = () => {
    return { __html: item.ItemECommerce ? item.ItemECommerce.shortDescription : '' }
  }


  return (
    <Layout>
      <Head>
        <title className="uppercase">{`${item.description}`}</title>
        <meta name="description" content={`${productDescriptionShort()}`}></meta>
        <meta name="robots" content="index, follow"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="keywords" content={`${item.description.replace(' ', ',')}`}></meta>
        <meta property="og:title" content={`${item.description}`}></meta>
        <meta property="og:description" content={`${productDescriptionShort()}`}></meta>
        <meta property="og:image" content={`${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.jpg`} alt={`${item.description}`}></meta>
        <meta property="og:url" content={`https://shootingsuppliesltd.co.uk${router.asPath}`}></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta charSet="UTF-8"></meta>
      </Head>
      <div className="mx-72 my-12 flex justify-center">
        <div className="w-1/2 p-2">
          <img src={`${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.jpg`} alt={`${item.description}`} />
        </div>
        <div className="p-6 w-1/2 p-2 bg-gray-50 rounded-lg">
          <h1 className="text-4xl font-bold">{item.description}</h1>
          <p>SKU: {item.customSku}</p>
          <p className="mt-2 font-bold text-4xl uppercase">{formatCurrencyString({
            value: item.Prices.ItemPrice[0].amount.replace('.', ''),
            currency: 'GBP',
          })}</p>
          <p className="mt-8" dangerouslySetInnerHTML={productDescriptionShort()}></p>
          <a href="#fulldescription"><p className="mt-2 text-ssblue hover:text-ssorange">Full Description..</p></a>
          {item.ItemShops.ItemShop[0].qoh > 0 ? <p className="mt-8 text-green-500 font-bold text-lg">In Stock</p> : <p className="mt-8 text-red-500 font-bold text-lg">Out of Stock - Check Back or Call for Availability</p>}
        </div>
      </div>
      <div id="fulldescription" className="mx-72 mt-8 mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="font-bold text-2xl">Full Description</h2>
        <div dangerouslySetInnerHTML={productDescriptionLong()} className="mt-4"></div>
      </div>
    </Layout>
  )
}

export default Item