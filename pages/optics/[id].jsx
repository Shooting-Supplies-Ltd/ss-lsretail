import { formatCurrencyString } from 'use-shopping-cart';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getOptics, getItem } from '../api/lightspeed';
import Layout from '../../components/layout/Layout';

export async function getStaticPaths() {
  const data = await getOptics();

  const paths = await data.data.Item.map((item) => ({
    params: { id: item.itemID },
  })).filter((path) => path);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const itemData = await getItem(id);
  const item = await itemData.data?.Item;

  if (!item) return;

  return {
    props: { item },
    revalidate: 300,
  };
}

const Item = ({ item }) => {
  const router = useRouter();
  // const product = {
  //   name: item.description,
  //   description: item.ItemECommerce ? item.ItemECommerce.longDescription : '',
  //   shortDescription: item.ItemECommerce ? item.ItemECommerce.shortDescription : '',
  //   sku: item.customSku,
  //   price: item.Prices.ItemPrice[0].amount.replace('.', ''),
  //   currency: 'GBP',
  //   image: `${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.jpg`,
  //   itemID: item.itemID,
  //   unitPrice: item.Prices.ItemPrice[0].amount,
  // }

  const Mailto = ({ email, subject = '', body = '', children }) => {
    let params = subject || body ? '?' : '';
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

    return <a href={`mailto:${email}${params}`}>{children}</a>;
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  const productDescriptionLong = () => ({ __html: item.ItemECommerce ? item.ItemECommerce.longDescription : '' });

  const productDescriptionShort = () => ({ __html: item.ItemECommerce ? item.ItemECommerce.shortDescription : '' });

  return (
    <Layout>
      <Head>
        <title className="uppercase">{`${item.description}`}</title>
        <meta name="description" content={`${productDescriptionShort()}`} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={`${item.description.replace(' ', ',')}`} />
        <meta property="og:title" content={`${item.description}`} />
        <meta property="og:description" content={`${productDescriptionShort()}`} />
        <meta
          property="og:image"
          content={`${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.jpg`}
          alt={`${item.description}`}
        />
        <meta property="og:url" content={`https://shootingsuppliesltd.co.uk${router.asPath}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta charSet="UTF-8" />
      </Head>
      <main>
        <div className="lg:mx-72 lg:my-12 flex flex-col lg:flex-row justify-center">
          <div className="w-3/4 mx-auto lg:mx-0 lg:w-1/2 p-2">
            <img
              src={`${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.jpg`}
              alt={`${item.description}`}
              className="object-contain"
            />
          </div>
          <div className="p-6 lg:w-1/2 p-2 bg-gray-50 rounded-lg">
            <h1 className="text-4xl font-bold">{item.description}</h1>
            <p>SKU: {item.customSku}</p>
            <p className="mt-2 font-bold text-4xl uppercase">
              {formatCurrencyString({
                value: item.Prices.ItemPrice[0].amount.replace('.', ''),
                currency: 'GBP',
              })}
            </p>
            {item.ItemShops.ItemShop[0].qoh > 0 ? (
              <p className="mt-4 text-green-500 font-bold text-lg">In Stock</p>
            ) : (
              <p className="mt-4 text-red-500 font-bold text-lg">Out of Stock - Check Back or Call for Availability</p>
            )}
            <p className="mt-8" dangerouslySetInnerHTML={productDescriptionShort()} />
            <a href="#fulldescription" className="hidden lg:block">
              <p className="mt-2 text-ssblue hover:text-ssorange">Full Description..</p>
            </a>
          </div>
        </div>
        <hr className="lg:hidden my-8" />
        <div id="fulldescription" className="mx-0 lg:mx-72 mt-8 mb-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="font-bold text-2xl">Full Description</h2>
          <div dangerouslySetInnerHTML={productDescriptionLong()} className="mt-4 prose" />
        </div>
        <div className="lg:mx-72 mx-4">
          <h3 className="my-8 text-2xl font-black uppercase">
            Please Contact Us to Purchase this item or for more information
          </h3>
        </div>
        <div className="lg:mx-72 flex mx-4 my-8">
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
    </Layout>
  );
};

export default Item;
