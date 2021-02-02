import Link from 'next/link'
import slugify from 'slugify'

const GunProductCard = ({ gun }) => {
  let slug = slugify(`${gun.Make}-${gun.Model}-${gun.Variant}-${gun.ID}`).toLowerCase()

  return (
    <div className="block h-80 border-2 border-gray-300 rounded-lg  bg-ssblue">
      <Link href={`/guns/[slug]`} as={`/guns/${slug}`}>
        <a>
          <div className="flex h-48 overflow-hidden">
            <img src={gun.Images[0].FullPath} alt={`Photo of ${gun.Make} ${gun.Model} ${gun.Variant ? gun.Variant : ''}`} className="w-full object-cover object-center" />
          </div>
          <div className="p-4 flex flex-col">
            <h2 className="flex justify-center text-center text-white uppercase">{`${gun.Make} ${gun.Model} ${gun.Variant ? gun.Variant : ''}`}</h2>
            <p className="mt-2 flex justify-center font-bold text-lg text-white">£{gun.Price}</p>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default GunProductCard