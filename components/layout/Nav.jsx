import Link from 'next/link'
import { useState } from 'react'
import CartIcon from '../cart/CartIcon'
import { useShoppingCart } from 'use-shopping-cart'
import CartDisplay from '../CartDisplay'

const Nav = () => {
  const [cartDisplay, setCartDisplay] = useState(false)
  const { cartCount } = useShoppingCart()

  const updateCartDisplay = () => {
    setCartDisplay(!cartDisplay)
  }

  return (
    <div>
      <div className="w-full flex">
        <div className="w-3/12"></div>
        <div className="w-6/12 text-center">
          <p>Get the latest from Shooting Supplies on our <Link href="/"><span className="underline">Blog</span></Link></p>
        </div>
        <div className="w-3/12 text-center">
          <p>Contact Us: 01527 831 261</p>
        </div>
      </div>
      <div className="bg-ssblue text-white
      ">
        <div className="h-20 flex justify-between">
          <div className="w-3/12 flex justify-center">
            <div className="absolute z-10">
              <Link href="/">
                <a><img src="/logos/Logo.png" alt="Shooting Supplies Ltd Logo" width="180" className="py-6 mr-8" /></a>
              </Link>
            </div>
          </div>
          <div className="w-6/12 flex justify-center items-center">
            <ul className="flex text-xl font-black space-x-16">
              <Link href="/guns">
                <a>
                  <li className="hover:text-ssorange">GUNS</li>
                </a>
              </Link>
              <Link href="/ammo">
                <a>
                  <li className="hover:text-ssorange">AMMO</li>
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
              <Link href="/security">
                <a>
                  <li className="hover:text-ssorange">SECURITY</li>
                </a>
              </Link>
              <Link href="/maintenance">
                <a><li className="hover:text-ssorange">MAINTENANCE</li></a>
              </Link>
              <Link href="/clothing">
                <a><li className="hover:text-ssorange">CLOTHING</li></a>
              </Link>
            </ul>
          </div>
          <div className="w-3/12 flex justify-end">
            <div onMouseEnter={updateCartDisplay} onMouseLeave={updateCartDisplay} className="hidden">
              <CartIcon />
              {cartCount > 0 && cartDisplay && <CartDisplay />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav