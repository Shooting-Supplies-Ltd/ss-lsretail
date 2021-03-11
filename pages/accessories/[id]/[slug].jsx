import slugify from 'slugify';
import { getAccessories, getItem } from '../../../adapters/lightspeed/lightspeed';
import Layout from '../../../components/layout/Layout';
import LightspeedProduct from '../../../components/LightspeedProduct';

export async function getStaticPaths() {
  const data = await getAccessories();

  const paths = await data.data.Item.map((item) => ({
    params: {
      slug: slugify(item.description.replace('/', '-'))
        .replace(/["'.,]/g, '')
        .toLocaleLowerCase(),
      id: item.itemID,
    },
  })).filter((path) => path);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  const itemData = await getItem(id).catch((err) => console.error(err));
  const item = await itemData.data.Item;

  if (!item) return;

  return {
    props: { item },
    revalidate: 10,
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
      <Layout>
        <div>Loading...</div>;
      </Layout>
    );
  }

  return (
    <Layout>
      <LightspeedProduct item={item} />
    </Layout>
  );
};

export default Item;
