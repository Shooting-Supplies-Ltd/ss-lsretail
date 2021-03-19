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
        <title>Shooting Supplies Ltd | The Midlands leading Shooting Supplier.</title>
        <link rel="canonical" href="https://www.shootingsuppliesltd.co.uk" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'LocalBusiness',
              name: 'Shooting Supplies Ltd',
              description:
                'The Midlands leading gun shop for Rifles, Shotguns, Airguns, Ammo, Reloading, Scopes, Accessories, Clothing & More.',
              openingHours: ['Tu,We,Th,Sa 09:00-17:30', 'Fr 09:00-19:00'],
              telephone: '01527831261',
              paymentAccepted: 'Cash, Credit Card, Debit Card, Finance',
              url: 'https://www.shootingsuppliesltd.co.uk',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '38, Sherwood Road',
                addressLocality: 'Bromsgrove',
                addressRegion: 'Worcestershire',
                postalCode: 'B60 3DR',
                email: 'info@shootingsuppliesltd.co.uk',
              },
              logo: '/logos/Logo.webp',
            }),
          }}
        />
        <meta
          name="description"
          content="The Midlands leading gun shop for Rifles, Shotguns, Airguns, Ammo, Reloading, Scopes, Accessories, Clothing & More."
        />
        <meta
          name="keywords"
          content="shotgun, air rifle, air pistol, long barrel pistol, firearms, rifle, rifle scope, night vision, binoculars, spotters, bipods, foregrip, pellets, air gun pellets, gun mounts, rangefinder, thermal scope"
        />
        <meta property="og:url" content="https://www.shootingsuppliesltd.co.uk" />
        <meta property="og:type" content="website" />
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
