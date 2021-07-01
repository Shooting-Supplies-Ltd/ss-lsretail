import Head from "next/head";
import { useRouter } from "next/router";

export default function LsProductHead({ item }) {
  const router = useRouter();

  return (
    <Head>
      <title>{`${item.description} | Shooting Supplies Ltd`}</title>
      <meta
        property="description"
        content={`${item.ItemECommerce.shortDescription.replace(
          /(<([^>]+)>)/gi,
          ""
        )}`}
      />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content={`${item.description.replace(" ", ",")}`} />
      <meta property="og:title" content={`${item.description}`} />
      <meta
        property="og:description"
        content={`${item.ItemECommerce.shortDescription.replace(
          /(<([^>]+)>)/gi,
          ""
        )}`}
      />
      <meta
        property="og:image"
        content={`${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.webp`}
        alt={`${item.description}`}
      />
      <meta
        property="og:url"
        content={`https://shootingsuppliesltd.co.uk${router.asPath}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta charSet="UTF-8" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Product",
            sku: item.customSku,
            image: `${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.webp`,
            name: item.description,
            brand: item.Manufacturer.name ? item.Manufacturer.name : "",
            description: item.ItemECommerce.shortDescription.replace(
              /(<([^>]+)>)/gi,
              ""
            ),
            mpn: item.manufacturerSku ? item.manufacturerSku : "",
            offers: {
              priceValidUntil: new Date(
                new Date().setFullYear(new Date().getFullYear() + 1)
              ),
              "@type": "Offer",
              url: `https://shootingsuppliesltd.co.uk${router.asPath}`,
              priceCurrency: "GBP",
              price: item.Prices?.ItemPrice[0]?.amount,
              itemCondition: "https://schema.org/NewCondition",
              availability:
                item.ItemShops?.ItemShop[0]?.qoh > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />
    </Head>
  );
}
