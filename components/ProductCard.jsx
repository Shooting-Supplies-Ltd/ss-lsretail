import Link from 'next/link'
import slugify from 'slugify'

const ProductCard = ({ item }) => {
  const slug = slugify(item.description).toLocaleLowerCase()
  const name = item.description
  const imageUrl = `${item.Images?.Image?.baseImageURL}/w_250/${item.Images?.Image?.publicID}.jpg`

  return (
    <div className="block h-80 border-2 border-gray-300 rounded-lg  bg-ssblue">
      <Link as={`/product/${slug}`} href={`/product?slug=${slug}-${item.itemID}`}>
        <a>
          <div className="flex h-48 overflow-hidden">
            <img src={imageUrl} alt={`Image of ${name}`} className="w-full object-cover object-center" />
          </div>
          <div className="p-4 flex flex-col">
            <h2 className="flex justify-center text-center text-white uppercase">{name}</h2>
            <p className="mt-2 flex justify-center font-bold text-lg text-white">£{item.Prices.ItemPrice[0].amount}</p>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default ProductCard