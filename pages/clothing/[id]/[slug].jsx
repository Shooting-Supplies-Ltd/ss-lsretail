import { getMatrixClothing } from '../../../adapters/lightspeed/lightspeed';
import LightspeedMatrixProduct from '../../../components/product-page/LightspeedMatrixProduct';

export async function getServerSideProps({ res, query }) {
  res.setHeader('Cache-Control', `s-maxage=60, stale-while-revalidate`)

  const id = query.id

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
  };
}

const Item = ({ item }) => (
  <>
    <LightspeedMatrixProduct item={item} />
  </>
);
export default Item;
