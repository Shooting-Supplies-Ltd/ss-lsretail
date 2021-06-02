import slugify from 'slugify';
import { getSecurity, getItem } from '../../../adapters/lightspeed/lightspeed';
import LightspeedProduct from '../../../components/LightspeedProduct';

export async function getStaticPaths() {
  const data = await getSecurity();

  const paths = await data
    .map((item) => ({
      params: {
        slug: slugify(item.description.replace('/', '-'))
          .replace(/["'.,]/g, '')
          .toLocaleLowerCase(),
        id: item.itemID,
      },
    }))
    .filter((path) => path);

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const id = await params.id;

  if (!id) {
    return {
      notFound: true,
    };
  }

  const data = await getItem(id);
  const item = data[0];

  return {
    props: { item },
    revalidate: 60,
  };
}

const Item = ({ item }) => (
  <>
    <LightspeedProduct item={item} />
  </>
);
export default Item;
