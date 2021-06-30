import slugify from 'slugify';
import { getTippmann, getItem } from '../../../adapters/lightspeed/lightspeed';
import LightspeedProduct from '../../../components/product-page/LightspeedProduct';

export async function getServerSideProps({ res, query }) {
  res.setHeader('Cache-Control', `s-maxage=60, stale-while-revalidate`)

  const id = await query.id;
  if (!id) {
    return {
      notFound: true,
    };
  }

  const data = await getItem(id);
  const item = data[0];

  return {
    props: { item },
  };
}

const Item = ({ item }) => (
  <>
    <LightspeedProduct item={item} />
  </>
);
export default Item;
