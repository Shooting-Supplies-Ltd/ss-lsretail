import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { formatCurrencyString } from 'use-shopping-cart';

export default function LightspeedProduct({ item }) {
  const router = useRouter();
  const productDescriptionLong = () => ({ __html: item.ItemECommerce ? item.ItemECommerce.longDescription : '' });
  const productDescriptionShort = () => ({ __html: item.ItemECommerce ? item.ItemECommerce.shortDescription : '' });
  const price = parseFloat(item.Prices?.ItemPrice[0]?.amount).toFixed(2).replace('.', '');

  const Mailto = ({ email, subject = '', body = '', children }) => {
    let params = subject || body ? '?' : '';
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

    return <a href={`mailto:${email}${params}`}>{children}</a>;
  };

  return (
    <>
      <Head>
      <title className="uppercase">{`BUY ${item.description}. ONLY ${formatCurrencyString({
      value: price,
      currency: 'GBP',
    })} | SHOOTING SUPPLIES LTD`}</title>
    <meta property="description" content={`${item.ItemECommerce.shortDescription.replace(/(<([^>]+)>)/gi, '')}`} />
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="keywords" content={`${item.description.replace(' ', ',')}`} />
    <meta property="og:title" content={`${item.description}`} />
    <meta
      property="og:description"
      content={`${item.ItemECommerce.shortDescription.replace(/(<([^>]+)>)/gi, '')}`}
    />
    <meta
      property="og:image"
      content={`${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.webp`}
      alt={`${item.description}`}
    />
    <meta property="og:url" content={`https://shootingsuppliesltd.co.uk${router.asPath}`} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta charSet="UTF-8" />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'http://schema.org',
          '@type': 'Product',
          sku: item.customSku,
          image: `${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.webp`,
          name: item.description,
          description: item.ItemECommerce.shortDescription.replace(/(<([^>]+)>)/gi, ''),
          priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          offers: {
            '@type': 'Offer',
            url: `https://shootingsuppliesltd.co.uk${router.asPath}`,
            priceCurrency: 'GBP',
            price: item.Prices?.ItemPrice[0]?.amount,
            itemCondition: 'https://schema.org/NewCondition',
            availability:
              item.ItemShops?.ItemShop[0]?.qoh > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          },
        }),
      }}
    />
      </Head>
      <main>
        <div className="lg:mx-72 lg:my-12 flex flex-col lg:flex-row justify-center">
          <div className="relative w-3/4 mx-auto lg:mx-0 lg:w-1/2 p-2">
            <Image
              src={`${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.webp`}
              alt={`Buy ${item.description} at Shooting Supplies Ltd`}
              width={600}
              height={600}
              className="object-scale-down"
            />
          </div>
          <div className="p-4 lg:w-1/2 bg-gray-50 rounded-xl">
            <h1 className="text-4xl font-black">{item.description}</h1>
            <p className="mt-1">SKU: {item.customSku}</p>
            <div>
              {item.ItemShops ? (
                item.ItemShops.ItemShop[0].qoh > 0 ? (
                  <p className="mt-1 text-green-500 font-bold uppercase">In Stock</p>
                ) : item.ItemShops.ItemShop[0].backorder >= 1 ? (
                  <p className="mt-1 text-red-500 font-bold uppercase">Out of Stock - On Order</p>
                ) : (
                  <p className="mt-1 text-red-500 font-bold uppercase">Out of Stock</p>
                )
              ) : (
                ''
              )}
            </div>

            {item.CustomFieldValues ? (
              item.CustomFieldValues.CustomFieldValue.map((field) => {
                if (field.customFieldID === '5' && field.value === 'true') {
                  return (
                    <>
                      <p className="mt-4 font-bold text-4xl uppercase">
                        <span className="line-through mr-2 text-sm lg:text-md xl:text-xl">
                          £{parseFloat(item.Prices.ItemPrice[1].amount).toFixed(2)}
                        </span>
                        {formatCurrencyString({
                          value: price,
                          currency: 'GBP',
                        })}
                      </p>
                      <span className="absolute z-10 top-32 lg:top-44 xl:top-32 md:left-auto lg:left-60 xl:left-80 font-semibold inline-block py-2 px-3 uppercase rounded-lg md:text-2xl text-white bg-red-600 uppercase">
                        Sale
                      </span>
                    </>
                  );
                }
              })
            ) : (
              <p className="mt-4 font-bold text-4xl uppercase">
                {formatCurrencyString({
                  value: price,
                  currency: 'GBP',
                })}
              </p>
            )}

            {item.CustomFieldValues
              ? item.CustomFieldValues.CustomFieldValue.map((field) => {
                  if (field.customFieldID === '5' && field.value === 'false') {
                    return (
                      <>
                        <p className="mt-4 font-bold text-4xl uppercase">
                          {formatCurrencyString({
                            value: price,
                            currency: 'GBP',
                          })}
                        </p>
                      </>
                    );
                  }
                })
              : null}

            <p className="mt-4 prose" dangerouslySetInnerHTML={productDescriptionShort()} />
          </div>
        </div>
        <hr className="lg:hidden my-4" />
        <div id="fulldescription" className="mx-0 lg:mx-72 mt-4 mb-12 p-4 bg-gray-50 rounded-xl">
          <h2 className="font-bold text-3xl text-center uppercase font-black">Description</h2>
          <div dangerouslySetInnerHTML={productDescriptionLong()} className="mt-4 mx-auto prose" />
        </div>
        <div className="lg:mx-72 mx-4">
          <h3 className="my-8 text-2xl font-black uppercase text-center">
            Please Contact Us to Purchase this item or for more information
          </h3>
        </div>
        <div className="lg:mx-72 flex justify-center mx-4 mb-20">
          <a
            href="tel:01527831261"
            className="flex items-center justify-center h-10 w-24 mr-4 bg-ssblue hover:bg-green-600 text-lg text-white font-bold uppercase rounded"
          >
            Call Us
          </a>
          <Mailto
            email="info@shootingsuppliesltd.co.uk"
            subject={`ITEM ENQUIRY: ${item.description} / ${item.customSku}`}
          >
            <p className="flex items-center justify-center h-10 w-24 mr-4 bg-ssblue hover:bg-green-600 text-lg text-white font-bold uppercase rounded">
              Email
            </p>
          </Mailto>
        </div>
      </main>
    </>
  );
}
