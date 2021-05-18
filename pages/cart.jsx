import React, { useState, useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { setCookie, destroyCookie } from 'nookies';

import Head from 'next/head';
import { fetchPostJSON } from './api/api-helpers';
import CartItems from '../components/cart/CartItems';

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const { cartCount, clearCart, cartDetails, redirectToCheckout, formattedTotalPrice } = useShoppingCart();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const clearCookie = () => {
    destroyCookie(null, 'cart');
    clearCart();
  };

  const handleCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);
    setCookie(null, 'cart', JSON.stringify({ cartDetails, formattedTotalPrice }), { path: '/' });

    const response = await fetchPostJSON('/api/checkout_sessions/cart', cartDetails);

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    redirectToCheckout({ sessionId: response.id });
  };

  return (
    <>
      <Head>
        <title>Cart | Shooting Supplies Ltd</title>
        <meta name="description" content="Your Cart" />
      </Head>
      <div className="xl:mx-96 xl:my-12">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded overflow-hidden">
            <table className="xl:min-w-full xl:leading-normal">
              <thead className="xl:bg-black xl:text-white">
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-black text-left text-xs font-semibold text-white uppercase tracking-wider" />
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-black text-left text-xs font-semibold text-white uppercase tracking-wider" />
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-black text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-black text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-black text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <CartItems cartDetails={cartDetails} />
              </tbody>
            </table>
          </div>
        </div>
        <div className="xl:flex xl:justify-end">
          <div className="xl:w-48 xl:flex xl:flex-col xl:border-2 xl:border-gray-200 xl:text-center">
            <div className="xl:p-2 xl:bg-black xl:text-white xl:rounded-t">
              <h3>Cart Total</h3>
            </div>
            <div className="xl:p-2 xl:text-center">
              <p>{formattedTotalPrice}</p>
            </div>
          </div>
        </div>
        <div className="xl:mt-4 xl:flex xl:justify-end">
          <button onClick={clearCookie} className="xl:mt-4 xl:bg-black xl:text-white xl:rounded xl:p-2 ">
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="xl:ml-4 xl:mt-4 xl:bg-black xl:text-white xl:rounded xl:p-2"
            disabled
          >
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
