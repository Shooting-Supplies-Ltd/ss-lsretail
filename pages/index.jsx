import Head from 'next/head';

import Layout from '../components/layout/Layout';
import HomeBanner from '../components/home/HomeBanner';
import Categories from '../components/home/Categories';
import HelpBanner from '../components/home/HelpBanner';
import SubHeader from '../components/home/SubHeader';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Shooting Supplies Ltd | The Midlands leading Shooting Supplier</title>
      </Head>
      <div>
        <div id="app-modal" />
        <div className="hidden lg:block">
          <HomeBanner />
        </div>
        <div className="hidden lg:block">
          <SubHeader />
        </div>
        <div>
          <Categories />
        </div>
      </div>
      <HelpBanner />
    </Layout>
  );
}
