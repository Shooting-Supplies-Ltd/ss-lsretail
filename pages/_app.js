import '../style/index.css';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from 'use-shopping-cart';
import Router from 'next/router';
import withYM from 'next-ym';

function MyApp({ Component, pageProps }) {
  const stripePromise = loadStripe(`${process.env.STRIPE_API_PUBLIC_KEY}`);

  return (
    <CartProvider
      stripe={stripePromise}
      mode="checkout-session"
      successUrl="stripe.com"
      cancelUrl="shootingsuppliesltd.co.uk"
      currency="GBP"
      allowedCountries={['GB']}
      billingAddressCollection
    >
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default withYM('55362838', Router)(MyApp);
