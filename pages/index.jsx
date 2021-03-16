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
        <title>Shooting Supplies Ltd | The Midlands leading Shooting Supplier. Guns, Ammo, Optics & More</title>
        <link rel="canonical" href="https://shootingsuppliesltd.co.uk" />
        <meta name="description" content="The Midlands Leading Shooting Retailer for Guns, Optics, Ammo & More." />
        <meta
          name="keywords"
          content="shotgun, air rifle, air pistol, long barrel pistol, firearms, rifle, rifle scope, night vision, binoculars, spotters, bipods, foregrip, pellets, air gun pellets, gun mounts, rangefinder, thermal scope"
        />
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
