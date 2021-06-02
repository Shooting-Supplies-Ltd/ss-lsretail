import '../style/index.css';
import 'react-bnb-gallery/dist/style.css';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from 'use-shopping-cart';
import Layout from '../components/layout/Layout';

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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
