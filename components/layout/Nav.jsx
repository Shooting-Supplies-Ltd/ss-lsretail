import Link from "next/link";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { CgMenuRight } from "react-icons/cg";
import { BiLinkExternal } from "react-icons/bi";

import Image from "next/image";
import CartIcon from "../cart/CartIcon";
import CartDisplay from "../cart/CartDisplay";

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
        <div className="absolute z-20 top-24 bg-ssblue w-full text-white shadow-2xl">
          <ul className="my-6 text-center uppercase font-bold">
            <Link href="/guns">
              <a>
                <li className="text-white hover:text-ssorange font-bold text-2xl">
                  GUNS
                </li>
              </a>
            </Link>
            <Link href="/ammo">
              <a>
                <li className="mt-4 text-white hover:text-ssorange font-bold text-2xl">
                  AMMO
                </li>
              </a>
            </Link>
            <Link href="/reloading">
              <a>
                <li className="mt-4 text-white hover:text-ssorange font-bold text-2xl">
                  RELOADING
                </li>
              </a>
            </Link>
            <Link href="/accessories">
              <a>
                <li className="mt-4 text-white hover:text-ssorange font-bold text-2xl">
                  ACCESSORIES
                </li>
              </a>
            </Link>
            <Link href="/optics">
              <a>
                <li className="mt-4 text-white hover:text-ssorange font-bold text-2xl">
                  OPTICS
                </li>
              </a>
            </Link>
            <Link href="/maintenance">
              <a>
                <li className="mt-4 text-white hover:text-ssorange font-bold text-2xl">
                  MAINTENANCE
                </li>
              </a>
            </Link>
            <Link href="/clothing">
              <a>
                <li className="mt-4 text-white hover:text-ssorange font-bold text-2xl">
                  CLOTHING
                </li>
              </a>
            </Link>
            <Link href="/security">
              <a>
                <li className="mt-4 text-white hover:text-ssorange font-bold text-2xl">
                  SECURITY
                </li>
              </a>
            </Link>
            <Link href="/blog">
              <a>
                <li className="mt-4 text-white hover:text-ssorange font-bold text-2xl">
                  BLOG
                </li>
              </a>
            </Link>
            <Link href="/tippmann-arms">
              <a>
                <li className="mt-4 text-white hover:text-ssorange font-bold text-2xl">
                  TIPPMANN ARMS
                </li>
              </a>
            </Link>
            <a
              href="https://fabdefense.co.uk"
              rel="noopener noreferrer"
              target="_blank"
            >
              <li className="mt-4 text-white hover:text-ssorange font-bold text-2xl">
                FAB DEFENSE{" "}
                <span className="ml-2 inline-block">
                  <BiLinkExternal className="p-1" />
                </span>
              </li>
            </a>
            {/* <Link href="/sale">
                <a><li className="text-white hover:text-ssorange font-bold text-2xl">SALE</li></a>
              </Link> */}
          </ul>
        </div>
      )}

      <div className="flex justify-between xl:h-16 bg-ssblue">
        <div className="xl:w-1/6 xl:flex xl:justify-center cursor-pointer">
          <div className="p-4 lg:p-0 xl:p-0 xl:absolute xl:z-10 xl:top-1 w-24 xl:w-40">
            <Link href="/">
              <a>
                <Image
                  src="/logos/Logo.webp"
                  alt="Shooting Supplies Ltd"
                  width={140}
                  height={140}
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="hidden xl:w-4/6 xl:p-2 xl:flex justify-center items-center">
          <ul className="flex space-x-6 p-2 font-bold text-xl text-white">
            <div className="flex justify-center items-center">
              <Link href="/guns">
                <a>
                  <li className="hover:text-ssorange">GUNS</li>
                </a>
              </Link>
            </div>
            <Link href="/ammo">
              <a>
                <li className="hover:text-ssorange">AMMO</li>
              </a>
            </Link>
            <Link href="/reloading">
              <a>
                <li className="hover:text-ssorange">RELOADING</li>
              </a>
            </Link>
            <Link href="/accessories">
              <a>
                <li className="hover:text-ssorange">ACCESSORIES</li>
              </a>
            </Link>
            <Link href="/optics">
              <a>
                <li className="hover:text-ssorange">OPTICS</li>
              </a>
            </Link>
            <Link href="/maintenance">
              <a>
                <li className="hover:text-ssorange">MAINTENANCE</li>
              </a>
            </Link>
            <Link href="/clothing">
              <a>
                <li className="hover:text-ssorange">CLOTHING</li>
              </a>
            </Link>
            <Link href="/security">
              <a>
                <li className="hover:text-ssorange">SECURITY</li>
              </a>
            </Link>
            <Link href="/tippmann-arms">
              <a>
                <li className="hover:text-ssorange">TIPPMANN ARMS</li>
              </a>
            </Link>
            {/* <Link href="/sale">
                <a><li className="text-white hover:text-ssorange font-bold text-2xl">SALE</li></a>
              </Link> */}
          </ul>
        </div>
        <div className="hidden w-1/6 p-2 xl:flex justify-center items-center text-white">
          <div
            onMouseEnter={updateCartDisplay}
            onMouseLeave={updateCartDisplay}
          >
            <CartIcon />
            {cartCount > 0 && cartDisplay && <CartDisplay />}
          </div>
        </div>
        <div className="mr-4 flex justify-end items-center text-3xl text-white xl:hidden">
          <CgMenuRight
            onClick={() => setDisplayMobileMenu(!displayMobileMenu)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
