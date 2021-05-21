import slugify from 'slugify';
import { getMatrixClothing } from '../../../adapters/lightspeed/lightspeed';
import LightspeedMatrixProduct from '../../../components/LightspeedMatrixProduct';

export async function getStaticPaths() {
  const data = await getMatrixClothing();

  const paths = await data
    .map((item) => ({
      params: {
        slug: slugify(item.description.replace('/', '-'))
          .replace(/["'.,]/g, '')
          .toLocaleLowerCase(),
        id: item.itemMatrixID,
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

  const data = await getMatrixClothing();
  const items = data;

  const filterItem = items.filter((item) => item.itemMatrixID === id);
  const item = filterItem[0];

  return {
    props: { item },
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
        <div>Loading...</div>;
      </>
    );
  }

  return (
    <>
      <LightspeedMatrixProduct item={item} />
    </>
  );
};

export default Item;
