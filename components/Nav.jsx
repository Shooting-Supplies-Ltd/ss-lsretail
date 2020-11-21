import Link from 'next/link'
import { useState } from 'react'
import CartIcon from './cart/CartIcon'
import { useShoppingCart } from 'use-shopping-cart'
import CartDisplay from './CartDisplay'

const Nav = () => {
  const [cartDisplay, setCartDisplay] = useState(false)
  const { cartCount } = useShoppingCart()

  const updateCartDisplay = () => {
    setCartDisplay(!cartDisplay)
  }

  return (
    <div className="text-white">
      <div className="bg-white text-sm">
        <div className="p-2 mx-48 flex">
          <div className="w-1/2 flex justify-center">
            {/* <p>Shooting Supplies Ltd, All rights Reserved.</p> */}
          </div>
          <div className="w-1/2 flex justify-end text-black">
            <p>Contact Us: 01527 831 261</p>
          </div>
        </div>
      </div>
      <div className="h-24 bg-ssblue text-white">
        <div className="h-24 flex justify-between items-center">
          <div className="w-3/12 mt-28 flex justify-center">
            <Link href="/">
              <a><img src="/logos/Logo.png" alt="Shooting Supplies Ltd Logo" width="180" className="py-6 mr-8" /></a>
            </Link>
          </div>
          <div className="w-6/12 flex justify-center">
            <ul className="flex text-white text-xl font-black space-x-16">
              <Link href="/guns">
                <a>
                  <li className="hover:text-fabred">GUNS</li>
                </a>
              </Link>
              <Link href="/ammo">
                <a>
                  <li className="hover:text-fabred">AMMO</li>
                </a>
              </Link>
              <Link href="/accessories">
                <a>
                  <li className="hover:text-fabred">ACCESSORIES</li>
                </a>
              </Link>
              <Link href="/optics">
                <a>
                  <li className="hover:text-fabred">OPTICS</li>
                </a>
              </Link>
              <Link href="/security">
                <a>
                  <li className="hover:text-fabred">SECURITY</li>
                </a>
              </Link>
              <Link href="/maintenance">
                <a><li className="hover:text-fabred">MAINTENANCE</li></a>
              </Link>
              <Link href="/clothing">
                <a><li className="hover:text-fabred">CLOTHING</li></a>
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