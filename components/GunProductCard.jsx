import Link from 'next/link'
import Image from 'next/image'
import slugify from 'slugify'

const GunProductCard = (props) => {
  const { gun } = props
  let slug = slugify(`${gun.Make}-${gun.Model}-${gun.Variant}-${gun.ID}`).toLowerCase()

  return (
    <div
      className="lg:mx-8 lg:my-8 lg:w-64 overflow-hidden flex flex-col rounded-lg shadow-lg border-2 hover:border-2 hover:border-ssorange text-white hover:text-ssorange">
      <Link href={`/guns/[slug]`} as={`/guns/${slug}`}>
        <a>
          <div>
            <Image
              src={gun.Images[0].FullPath}
              alt={`Photo of ${gun.Make} ${gun.Model} ${gun.Variant}`}
              width={250}
              height={250}
              key={gun.ID}
              className="object-contain"
            />
          </div>
          <div className="lg:p-4 h-full bg-ssblue font-bold uppercase">
            <h2 className="text-xl italic">{`${gun.Make} ${gun.Model} ${gun.Variant}`}</h2>
            <p className="mt-2 text-xl">£{gun.Price}</p>
          </div>
        </a>
      </Link>
    </div >
  )
}

export default GunProductCard