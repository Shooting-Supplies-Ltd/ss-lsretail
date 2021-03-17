import slugify from 'slugify';
import { getMatrixClothing, getMatrixClothingItem, getItem } from '../../../adapters/lightspeed/lightspeed';
import Layout from '../../../components/layout/Layout';
import LightspeedProduct from '../../../components/LightspeedProduct';

export async function getStaticPaths() {
  const data = await getMatrixClothing();

  const paths = await data.data.ItemMatrix.map((item) => ({
    params: {
      slug: slugify(item.description.replace('/', '-'))
        .replace(/["'.,]/g, '')
        .toLocaleLowerCase(),
      id: item.itemMatrixID,
    },
  })).filter((path) => path);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const itemData = await getMatrixClothingItem(id);
  const item = itemData.data.ItemMatrix;

  if (!item) return;

  return {
    props: { item },
    revalidate: 600,
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
