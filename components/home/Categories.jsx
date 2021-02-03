import Image from 'next/image'
import Link from 'next/link'

const Categories = () => {
  return (
    <div className="mx-36 my-24">
      <div className="flex justify-center">
        <ul className="grid grid-cols-3 gap-8">
          <div>
            <li className="border border-gray-300">
              <Link href="/guns">
                <a>
                  <Image
                    src="/home/Guns.png"
                    width={600}
                    height={280}
                    className="object-fill" />
                </a>
              </Link>
            </li>
          </div>
          <div>
            <li className="border border-gray-300">
              <Link href="/ammo">
                <a>
                  <Image
                    src="/home/Ammo.png"
                    width={600}
                    height={280} />
                </a>
              </Link>
            </li>
          </div>
          <div>
            <li className="border border-gray-300">
              <Link href="/optics">
                <a>
                  <Image
                    src="/home/Optics.png"
                    width={600}
                    height={280} />
                </a>
              </Link>
            </li>
          </div>
          <div>
            <li className="border border-gray-300">
              <Link href="/accessories">
                <a>
                  <Image
                    src="/home/Accessories.png"
                    width={600}
                    height={280} />
                </a>
              </Link>
            </li>
          </div>
          <div>
            <li className="border border-gray-300">
              <Link href="/maintenance">
                <a>
                  <Image
                    src="/home/Cleaning.png"
                    width={600}
                    height={280}
                    className="object-fill" />
                </a>
              </Link>
            </li>
          </div>
          <div>
            <li className="border border-gray-300">
              <Link href="/clothing">
                <a>
                  <Image
                    src="/home/Clothing.png"
                    width={600}
                    height={280} />
                </a>
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </div >
  )
}

export default Categories