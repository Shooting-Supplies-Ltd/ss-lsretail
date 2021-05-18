import slugify from 'slugify';
import { getAccessories } from '../../../adapters/lightspeed/lightspeed';
import LightspeedProduct from '../../../components/LightspeedProduct';

let items = null;

export async function getStaticPaths() {
  const data = await getAccessories();

  const paths = await data
    .map((item) => ({
      params: {
        slug: slugify(item.description.replace('/', '-'))
          .replace(/[+"'.,]/g, '')
          .toLocaleLowerCase(),
        id: item.itemID,
      },
    }))
    .filter((path) => path);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  if (!id) {
    return {
      notFound: true,
    };
  }

  if (items != null) {
    return {
      props: { item: items.filter((item) => item.itemID === id)[0] },
      revalidate: 300,
    };
  }

  const data = await getAccessories();
  items = data;

  return {
    props: { item: items.filter((item) => item.itemID === id)[0] },
    revalidate: 300,
  };
}

const Item = ({ item }) => {
  // const product = {
  //   name: item.description,
  //   description: item.ItemECommerce ? item.ItemECommerce.longDescription : '',
  //   shortDescription: item.ItemECommerce ? item.ItemECommerce.shortDescription : '',
  //   sku: item.customSku,
  //   price: item.Prices.ItemPrice[0].amount.replace('.', ''),
  //   currency: 'GBP',
  //   image: `${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.webp`,
  //   itemID: item.itemID,
  //   unitPrice: item.Prices.ItemPrice[0].amount,
  // }

  if (!item) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  return (
      <LightspeedProduct item={item} />
  );
};

export default Item;
