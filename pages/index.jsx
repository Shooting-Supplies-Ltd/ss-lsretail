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
        <meta name="description" content="The Midlands leading Shooting Supplier" />
      </Head>
      <div>
        <div id="app-modal" />
        <div className="hidden xl:block">
          <HomeBanner />
        </div>
        <div className="hidden xl:block">
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
