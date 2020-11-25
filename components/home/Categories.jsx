import Image from 'next/image'
import Link from 'next/link'

const Categories = () => {
  return (
    <div className="mx-24 my-24">
      <div className="my-24 flex justify-center">
        <ul className="grid grid-cols-3 gap-4">
          <div>
            <li className="hover:text-ssorange rounded-lg">
              <Link href="/">
                <a>
                  <Image
                    src="https://res.cloudinary.com/shooting-supplies/image/upload/v1573561021/shootingsuppliesltd.co.uk/Guns.jpg"
                    width={300}
                    height={150} />
                  <h2 className="mt-2 text-center font-bold text-xl">GUNS</h2>
                </a>
              </Link>
            </li>
          </div>
          <div>
            <li className="hover:text-ssorange rounded-lg">
              <Link href="/">
                <a>
                  <Image
                    src="https://res.cloudinary.com/shooting-supplies/image/upload/v1573561043/shootingsuppliesltd.co.uk/Ammo.jpg"
                    width={300}
                    height={150} />
                  <h2 className="mt-2 text-center font-bold text-xl">AMMO</h2>
                </a>
              </Link>
            </li>
          </div>
          <div>
            <li className="hover:text-ssorange rounded-lg mx-4 my-4">
              <Link href="/">
                <a>
                  <Image
                    src="https://res.cloudinary.com/shooting-supplies/image/upload/v1573561058/shootingsuppliesltd.co.uk/Scopes.jpg"
                    width={300}
                    height={150} />
                  <h2 className="mt-2 text-center font-bold text-xl">OPTICS</h2>
                </a>
              </Link>
            </li>
          </div>
        </ul>
      </div>
      <div className="flex justify-center">
        <ul className="grid grid-cols-3 gap-4">
          <div>
            <li className="hover:text-ssorange rounded-lg mx-4 my-4">
              <Link href="/">
                <a>
                  <Image
                    src="https://res.cloudinary.com/shooting-supplies/image/upload/v1573561073/shootingsuppliesltd.co.uk/Maintenance.jpg"
                    width={300}
                    height={150} />
                  <h2 className="mt-2 text-center font-bold text-xl">MAINTENANCE</h2>
                </a>
              </Link>
            </li>
          </div>
          <div>
            <li className="hover:text-ssorange rounded-lg mx-4 my-4">
              <Link href="/">
                <a>
                  <Image
                    src="https://res.cloudinary.com/shooting-supplies/image/upload/v1573561100/shootingsuppliesltd.co.uk/Reloading.jpg"
                    width={300}
                    height={150} />
                  <h2 className="mt-2 text-center font-bold text-xl">RELOADING</h2>
                </a>
              </Link>
            </li>
          </div>
          <div>
            <li className="hover:text-ssorange rounded-lg mx-4 my-4">
              <Link href="/">
                <a>
                  <Image
                    src="https://res.cloudinary.com/shooting-supplies/image/upload/v1573561134/shootingsuppliesltd.co.uk/Clothing.jpg"
                    width={300}
                    height={150} />
                  <h2 className="mt-2 text-center font-bold text-xl">CLOTHING</h2>
                </a>
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Categories