import Link from 'next/link';
import { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

import CartIcon from '../cart/CartIcon';
import CartDisplay from '../CartDisplay';

const Nav = () => {
  const [cartDisplay, setCartDisplay] = useState(false);
  const { cartCount } = useShoppingCart();

  const updateCartDisplay = () => {
    setCartDisplay(!cartDisplay);
  };

  return (
    <nav>
      <div className="bg-ssblue">
        <div className="flex h-12 mx-12">
          <div className="w-1/6 flex justify-center p-2">
            <Link href="/">
              <img
                className="absolute z-10 top-1 h-40 w-auto border-2 border-white hover:border-ssorange hover:pointer rounded-xl"
                src="/logos/Logo.png"
                alt="Shooting Supplies"
              />
            </Link>
          </div>
          <div className="w-4/6 p-2 flex items-center justify-center">
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
        </div>
      </div>
    </nav>
  );
};

export default Nav;
