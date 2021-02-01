import Image from 'next/image'
import Layout from '../components/layout/Layout'
import Link from 'next/link'
import { getItem } from './api/lightspeed'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

const Product = (props) => {
  const { addItem, cartCount } = useShoppingCart()
  const { Item } = props.item

  const product = {
    name: Item.description,
    description: Item.ItemECommerce ? Item.ItemECommerce.longDescription : '',
    shortDescription: Item.ItemECommerce ? Item.ItemECommerce.shortDescription : '',
    sku: Item.customSku,
    price: Item.Prices.ItemPrice[0].amount.replace('.', ''),
    currency: 'GBP',
    image: `${Item.Images.Image.baseImageURL}/w_250/${Item.Images.Image.publicID}.jpg`,
    itemID: Item.itemID,
    unitPrice: Item.Prices.ItemPrice[0].amount,
  }

  console.log('Type of Product Description:', typeof product.description)
  console.log('Product Description:', product.description)

  const productDescriptionLong = () => {
    return { __html: `${product.description}` }
  }

  const productDescriptionShort = () => {
    return { __html: product.shortDescription }
  }

  return (
    <Layout>
      <div className="my-12 mx-72 rounded-b-lg shadow-lg border-t-4 border-ssblue">
        <div className="mt-4 grid grid-cols-2 gap-4">

          <div>
            <div className="mt-4 flex justify-center">
              {/* <img src={product.image} alt={`Image of the ${product.name}`} width="400" /> */}
              <Image
                src={product.image}
                alt={`Photo of ${product.name}`}
                width={300}
                height={300}
              />
            </div>
          </div>

          <div className="mr-4">
            <h1 className="mt-4 font-black text-3xl uppercase italic">{product.name}</h1>
            <p className="mt-2 font-black text-2xl uppercase">{formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}</p>
            <div className="mt-4" dangerouslySetInnerHTML={productDescriptionShort()}></div>
            <div className="mt-4 uppercase text-sm font-semibold">Stock Qty: {Item.ItemShops.ItemShop[0].qoh}</div>
            <button
              onClick={() => addItem(product)}
              aria-label={`Add ${product.name} to your cart`}
              className="my-8 p-2 bg-ssblue text-white font-bold rounded mr-2"
            >
              Add to Cart
              </button>
            {cartCount > 0 ? (
              <Link href="/cart">
                <button className="my-8 p-2 bg-ssblue text-white font-bold rounded">View Cart</button>
              </Link>
            ) : ''}
          </div>
        </div>
        <div className="mx-24 pb-8">
          <h3 className="mb-4 text-center">{`${product.name} DESCRIPTION`}</h3>
          <div id="product-detail" dangerouslySetInnerHTML={{ __html: product.description }} className="prose" />
        </div>
      </div>
    </Layout >
  )
}

export async function getServerSideProps(ctx) {
  let { query: { slug } } = ctx
  const id = slug ? parseInt(slug.split('-').pop()) : ctx.query.id

  const data = await getItem(id)
  const item = await data.data

  return {
    props: {
      item,
      id
    }
  }
}

export default Product

// const { Item } = data

