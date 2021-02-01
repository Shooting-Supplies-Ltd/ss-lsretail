import Link from 'next/link'
import Image from 'next/image'
import slugify from 'slugify'

const GunProductCard = ({ gun }) => {
  console.log(gun)
  let slug = slugify(`${gun.Make}-${gun.Model}-${gun.Variant}-${gun.ID}`).toLowerCase()

  return (
    <div
      className="mx-8 my-8 w-64 overflow-hidden flex flex-col rounded shadow-lg border-2">
      <Link href={`/guns/[slug]`} as={`/guns/${slug}`}>
        <a>
          <div className="flex justify-center" key={gun.ID}>
            <Image
              src={gun.Images[0].FullPath}
              alt={`Photo of ${gun.Make} ${gun.Model} ${gun.Variant}`}
              width={250}
              height={250}
              key={gun.ID}
              className="object-contain"
            />
          </div>
          <div className="h-full p-4 bg-ssblue text-white font-bold uppercase">
            <h2>{`${gun.Make} ${gun.Model} ${gun.Variant}`}</h2>
            <p className="mt-4 text-lg">£{gun.Price}</p>
          </div>
        </a>
      </Link>
    </div >
  )
}

export default GunProductCard