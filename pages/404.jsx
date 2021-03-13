import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout/Layout';

const ErrorPage = () => (
  <Layout>
    <Head>
      <title>404 - Shooting Supplies Ltd</title>
      <meta name="description" content="404 Error. Oops, this page does not exist." />
    </Head>
    <div className="flex flex-col justify-center items-center">
      <h1 className="mt-12 text-4xl text-gray-900 font-black uppercase">404 - Page Not Found</h1>
      <p className="mt-8 text-xl">Oops - It looks like we have lost or moved a page</p>
      <p className="mt-4 text-xl">
        Click{' '}
        <span className="underline text-ssblue hover:text-ssorange">
          <Link href="/">
            <a>here</a>
          </Link>
        </span>{' '}
        to return to the home page and start again.
      </p>
      <p className="mt-8 text-xl">
        Or Call Us{' '}
        <span className="underline text-ssblue hover:text-ssorange">
          <a href="tel:01527831261">01527831261</a>
        </span>
      </p>
    </div>
  </Layout>
);

export default ErrorPage;
