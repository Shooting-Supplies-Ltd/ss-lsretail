import '../style/index.css';
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import ReactGA from 'react-ga'
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from 'use-shopping-cart';
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }) {
  const stripePromise = loadStripe(`${process.env.STRIPE_API_PUBLIC_KEY}`);

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      ReactGA.set({ page: url })
      ReactGA.pageview(url)
    }
    ReactGA.initialize('G-10QXNWF6NZ', { debug: false })
    ReactGA.set({ page: router.pathname })
    ReactGA.pageview(router.pathname)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

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
