import Image from 'next/image';
import Link from 'next/link';

const Categories = () => (
  <div className="xl:mx-36 mx-2 xl:my-24 my-8">
    <div className="flex justify-center">
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8">
        <div>
          <li className="border border-gray-300 hover:border-ssorange">
            <Link href="/guns">
              <a aria-label="Guns">
                <Image src="/home/Guns.png" width={600} height={280} className="object-fill" />
              </a>
            </Link>
          </li>
        </div>
        <div>
          <li className="border border-gray-300 hover:border-ssorange">
            <Link href="/ammo">
              <a aria-label="Ammo">
                <Image src="/home/Ammo.png" width={600} height={280} />
              </a>
            </Link>
          </li>
        </div>
        <div>
          <li className="border border-gray-300 hover:border-ssorange">
            <Link href="/optics">
              <a aria-label="Optics">
                <Image src="/home/Optics.png" width={600} height={280} />
              </a>
            </Link>
          </li>
        </div>
        <div>
          <li className="border border-gray-300 hover:border-ssorange">
            <Link href="/accessories">
              <a aria-label="Accessories">
                <Image src="/home/Accessories.png" width={600} height={280} />
              </a>
            </Link>
          </li>
        </div>
        <div>
          <li className="border border-gray-300 hover:border-ssorange">
            <Link href="/maintenance">
              <a aria-label="Maintenance">
                <Image src="/home/Cleaning.png" width={600} height={280} className="object-fill" />
              </a>
            </Link>
          </li>
        </div>
        <div>
          <li className="border border-gray-300 hover:border-ssorange">
            <Link href="/clothing">
              <a aria-label="Clothing">
                <Image src="/home/Clothing.png" width={600} height={280} />
              </a>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  </div>
);

export default Categories;
