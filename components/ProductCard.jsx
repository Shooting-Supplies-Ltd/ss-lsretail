import Link from 'next/link'
import slugify from 'slugify'
import Image from 'next/image'

const ProductCard = (props) => {
  const { item } = props
  const name = item.description
  const slug = slugify(item.description).toLocaleLowerCase()
  const imageUrl = item.Images.Image.baseImageURL ? `${item.Images.Image.baseImageURL}/w_250/${item.Images.Image.publicID}.jpg` : item.Images.Image.FullPath

  return (
    <>
      <div className="mx-8 my-8 w-64 overflow-hidden flex flex-col rounded shadow-lg border-2">
        <Link as={`/product/${slug}`} href={`/product?slug=${slug}-${item.itemID}`}>
          <a>
            <div className="p-4 flex justify-center">
              {item.Images &&
                <Image
                  src={imageUrl}
                  alt={`Photo of ${item.description.image}`}
                  width={250}
                  height={250}
                />}
            </div>
            <div className="h-full p-4 bg-ssblue text-white font-bold uppercase">
              <h2>{item.description}</h2>
              <p className="mt-4 text-lg">£{item.Prices.ItemPrice[0].amount}</p>
            </div>
          </a>
        </Link>
      </div >
    </>
  )
}

export default ProductCard