import Link from 'next/link'
import Image from 'next/image'

const GunProductCard = (props) => {
  const { gun } = props

  return (
    <div className="lg:mx-8 lg:my-8 lg:w-64 lg:overflow-hidden flex flex-col rounded-lg lg:shadow-lg lg:border-2">
      <Link href="/">
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
          <div className="lg:p-4 bg-ssblue text-white font-bold uppercase">
            <h2>{`${gun.Make} ${gun.Model} ${gun.Variant}`}</h2>
            <p className="lg:mt-4 lg:text-lg">£{gun.Price}</p>
          </div>
        </a>
      </Link>
    </div >
  )
}

export default GunProductCard