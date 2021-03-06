import Head from "next/head";
import Link from 'next/link'
import CookieConsent from "react-cookie-consent";

import HomeBanner from "../components/home/HomeBanner";
import Categories from "../components/home/Categories";
import HelpBanner from "../components/home/HelpBanner";
import SubHeader from "../components/home/SubHeader";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          The Midlands Leading Supplier for Guns, Ammo, Accessories, Scopes,
          Clothing & More | Shooting Supplies Ltd
        </title>
        <link rel="canonical" href="https://www.shootingsuppliesltd.co.uk" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "LocalBusiness",
              name: "Shooting Supplies Ltd",
              description:
                "The Midlands Leading Supplier for Guns, Ammo, Accessories, Scopes, Clothing & More.",
              openingHours: ["Tu,We,Th,Sa 09:00-17:30", "Fr 09:00-19:00"],
              telephone: "01527831261",
              paymentAccepted: "Cash, Credit Card, Debit Card, Finance",
              url: "https://www.shootingsuppliesltd.co.uk",
              address: {
                "@type": "PostalAddress",
                streetAddress: "38, Sherwood Road",
                addressLocality: "Bromsgrove",
                addressRegion: "Worcestershire",
                postalCode: "B60 3DR",
                email: "info@shootingsuppliesltd.co.uk",
                image:
                  "https://res.cloudinary.com/shooting-supplies/image/upload/v1573564805/shop/ShootingSuppliesStore_inkcxw_qmb2bo.jpg",
              },
              logo: "/logos/Logo.webp",
            }),
          }}
        />
        <meta
          name="description"
          content="The Midlands Leading Supplier for Guns, Ammo, Accessories, Scopes, Clothing & More."
        />
        <meta
          name="keywords"
          content="shotgun, air rifle, air pistol, long barrel pistol, firearms, rifle, rifle scope, night vision, binoculars, spotters, bipods, foregrip, pellets, air gun pellets, gun mounts, rangefinder, thermal scope"
        />
        <meta
          property="og:url"
          content="https://www.shootingsuppliesltd.co.uk"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Shooting Supplies Ltd | The Midlands leading gun shop."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/shooting-supplies/image/upload/v1573564805/shop/ShootingSuppliesStore_inkcxw_qmb2bo.jpg"
        />
        <meta
          property="og:description"
          content="The Midlands Leading Supplier for Guns, Ammo, Accessories, Scopes, Clothing & More."
        />
      </Head>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="fab-cart"
        style={{ background: "#004d91" }}
        buttonStyle={{ backgroundColor: "#fff", color: "#000", fontSize: "16px", fontWeight: "700", borderRadius: "5px" }}
        expires={150}
      >
        This website uses cookies for functionality and user experience. <Link href="/privacy#cookies"><a><span className="underline">Learn More</span></a></Link>
      </CookieConsent>
      <div>
        <div className="hidden xl:block">
          <HomeBanner />
        </div>
        {/* <div className="hidden xl:block">
          <SubHeader />
        </div> */}
        <div>
          <Categories />
        </div>
      </div>
      <HelpBanner />
    </>
  );
}
