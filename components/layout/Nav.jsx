import Link from 'next/link';
import { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { CgMenuRight } from 'react-icons/cg';

import CartIcon from '../cart/CartIcon';
import CartDisplay from '../CartDisplay';

const Nav = () => {
  const [cartDisplay, setCartDisplay] = useState(false);
  const [displayMobileMenu, setDisplayMobileMenu] = useState(false);
  const { cartCount } = useShoppingCart();

  const updateCartDisplay = () => {
    setCartDisplay(!cartDisplay);
  };

  return (
    <nav>
      {displayMobileMenu && (
        <div className="absolute z-20 top-28 bg-ssblue w-full text-white shadow-2xl">
          <ul className="my-6 text-center uppercase font-bold">
            <Link href="/guns">
              <a>
                <li className="text-white hover:text-ssorange font-bold text-2xl">GUNS</li>
              </a>
            </Link>
            <Link href="/ammo">
              <a>
                <li className="mt-4 text-white hover:text-ssorange font-bold text-2xl">AMMO</li>
              </a>
            </Link>
            <Link href="/accessories">
              <a>
                <li className="mt-4 text-white hover:text-ssorange font-bold text-2xl">ACCESSORIES</li>
              </a>
            </Link>
            <Link href="/optics">
              <a>
                <li className="mt-4 text-white hover:text-ssorange font-bold text-2xl">OPTICS</li>
              </a>
            </Link>
            {/* <Link href="/security">
                <a>
                  <li className="text-white hover:text-ssorange font-bold text-2xl">SECURITY</li>
                </a>
              </Link> */}
            <Link href="/maintenance">
              <a>
                <li className="mt-4 text-white hover:text-ssorange font-bold text-2xl">MAINTENANCE</li>
              </a>
            </Link>
            <Link href="/clothing">
              <a>
                <li className="mt-4 text-white hover:text-ssorange font-bold text-2xl">CLOTHING</li>
              </a>
            </Link>
            <Link href="/blog">
              <a>
                <li className="mt-4 text-white hover:text-ssorange font-bold text-2xl">BLOG</li>
              </a>
            </Link>
            {/* <Link href="/sale">
                <a><li className="text-white hover:text-ssorange font-bold text-2xl">SALE</li></a>
              </Link> */}
          </ul>
        </div>
      )}
      <div className="xl:bg-ssblue">
        <div className="flex justify-between xl:justify-start h-28 xl:h-12 xl:mx-12 shadow xl:shadow-none">
          <div className="xl:w-1/6 xl:flex xl:justify-center p-2">
            <Link href="/">
              <img
                className="xl:absolute xl:z-10 xl:top-1 h-24 xl:h-40 w-auto border-2 border-white hover:border-ssorange hover:pointer rounded-xl"
                src="/logos/Logo.png"
                alt="Shooting Supplies"
              />
            </Link>
          </div>
          <div className="hidden xl:w-4/6 xl:p-2 xl:flex items-center justify-center">
            <ul className="flex justify-center space-x-6 p-2">
              <Link href="/guns">
                <a>
                  <li className="text-white hover:text-ssorange font-bold text-2xl">GUNS</li>
                </a>
              </Link>
              <Link href="/ammo">
                <a>
                  <li className="text-white hover:text-ssorange font-bold text-2xl">AMMO</li>
                </a>
              </Link>
              <Link href="/accessories">
                <a>
                  <li className="text-white hover:text-ssorange font-bold text-2xl">ACCESSORIES</li>
                </a>
              </Link>
              <Link href="/optics">
                <a>
                  <li className="text-white hover:text-ssorange font-bold text-2xl">OPTICS</li>
                </a>
              </Link>
              {/* <Link href="/security">
                <a>
                  <li className="text-white hover:text-ssorange font-bold text-2xl">SECURITY</li>
                </a>
              </Link> */}
              <Link href="/maintenance">
                <a>
                  <li className="text-white hover:text-ssorange font-bold text-2xl">MAINTENANCE</li>
                </a>
              </Link>
              <Link href="/clothing">
                <a>
                  <li className="text-white hover:text-ssorange font-bold text-2xl">CLOTHING</li>
                </a>
              </Link>
              {/* <Link href="/sale">
                <a><li className="text-white hover:text-ssorange font-bold text-2xl">SALE</li></a>
              </Link> */}
            </ul>
          </div>
          <div className="w-1/6 p-2 flex justify-center items-center hidden">
            <div onMouseEnter={updateCartDisplay} onMouseLeave={updateCartDisplay}>
              <CartIcon />
              {cartCount > 0 && cartDisplay && <CartDisplay />}
            </div>
          </div>
          <div className="mr-4 flex items-center text-3xl xl:hidden">
            <CgMenuRight onClick={() => setDisplayMobileMenu(!displayMobileMenu)} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
