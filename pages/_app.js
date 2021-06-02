import '../style/index.css';
import 'react-bnb-gallery/dist/style.css';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from 'use-shopping-cart';
import Layout from '../components/layout/Layout';
import { BrandsProvider } from '../context/BrandsContext';
import { CategoriesProvider } from '../context/CategoriesContext';

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
      <CategoriesProvider>
        <BrandsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BrandsProvider>
      </CategoriesProvider>
    </CartProvider>
  );
}

export default MyApp;
