import Head from "next/head";
import Image from "next/image";
import { getTippmann } from "../../adapters/lightspeed/lightspeed";
import TippmannProductCard from "../../components/product-page/TippmannProductCard";

export async function getStaticProps() {
  const getTippmannProducts = await getTippmann();
  const tippmannProducts = getTippmannProducts;

  const items = tippmannProducts.filter(
    (item) => item.Images && item.Manufacturer
  );

  return {
    props: { items },
    revalidate: 300,
  };
}

const Tippmann = ({ items }) => (
  <>
    <Head>
      <title>Tippmann Arms Rifles & Accessories | Shooting Supplies Ltd</title>
      <meta
        name="description"
        content="UK supplier of the fantastic Tippmann Arms M4 rifles and accessories"
      />
      <link
        rel="canonical"
        href="https://www.shootingsuppliesltd.co.uk/tippmann-arms"
      />
    </Head>
    <div className="flex justify-center lg:mx-4 lg:my-12 xl:mx-20">
      <Image
        src="/banners/tippmannBanner.png"
        layout="responsive"
        width={1920}
        height={380}
        className="rounded-lg"
      />
    </div>
    <div className="flex justify-center my-16 lg:mb-12 lg:my-4">
      <div className="lg:mt-0 grid gap-y-8 md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-12">
        {items.map((item) => (
          <div key={item.itemID}>
            <TippmannProductCard item={item} />
          </div>
        ))}
      </div>
    </div>
  </>
);

export default Tippmann;
