import {
  getItem,
  getMatrixItem,
} from "../../../adapters/lightspeed/lightspeed";
import LightspeedMatrixProduct from "../../../components/product-page/LightspeedMatrixProduct";
import LightspeedProduct from "../../../components/product-page/LightspeedProduct";

export async function getServerSideProps({ res, query }) {
  res.setHeader("Cache-Control", `s-maxage=60, stale-while-revalidate`);

  const { id, matrix } = query;

  if (matrix == "true") {
    const data = await getMatrixItem(id);
    const item = data[0];

    console.log("Matrix Item", item);

    return {
      props: { item },
    };
  } else {
    const data = await getItem(id);
    const item = data[0];

    console.log("Single Item", item);

    return {
      props: { item },
    };
  }
}

const Item = ({ item }) => {
  console.log(item);
  return (
    <>
      {item.itemMatrixID == 0 ? (
        <LightspeedProduct item={item} />
      ) : (
        <LightspeedMatrixProduct item={item} />
      )}
    </>
  );
};
export default Item;
