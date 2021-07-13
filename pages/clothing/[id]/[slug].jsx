import { useState, useEffect, useRef } from "react";
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

    return {
      props: { item },
    };
  } else {
    const data = await getItem(id);
    const item = data[0];

    return {
      props: { item },
    };
  }
}

const Item = ({ item }) => {
  const [image, setImage] = useState();
  const [shortDescription, setShortDescription] = useState({
    __html: item.ItemECommerce ? item.ItemECommerce.shortDescription : "",
  });
  const [checkedInputs, setCheckedInputs] = useState({});
  const [matrixItem, setMatrixItem] = useState();
  const [matrixLoading, setMatrixLoading] = useState(false);

  const loaded = useRef(false);

  // Set Item || MatrixItem on Load
  useEffect(() => {
    setImage(
      `${item.Images.Image.baseImageURL}/w_300/${item.Images.Image.publicID}.jpg`
    );
  }, []);

  // Get Matrix Item on checkedInputs change.
  useEffect(() => {
    async function getMatrixItem() {
      setMatrixLoading(true);

      const res = await fetch(`/api/item?itemID=${checkedInputs}`);
      const item = await res.json();

      setImage(
        item.Images
          ? `${item.Images.Image.baseImageURL}/w_300/${item.Images.Image.publicID}.jpg`
          : "/loading.gif"
      );

      setShortDescription({
        __html: item.ItemECommerce ? item.ItemECommerce.shortDescription : "",
      });

      setMatrixItem(item);
      setMatrixLoading(false);
    }

    if (loaded.current) {
      getMatrixItem();
    } else {
      loaded.current = true;
    }
  }, [checkedInputs]);

  // Handle matrix input
  const handleInputChange = (event) => {
    setCheckedInputs([event.target.value]);
  };

  console.log("Item", item);
  console.log("Matrix Item", matrixItem);

  return (
    <>
      {item.itemMatrixID == 0 ? (
        <LightspeedProduct item={item} />
      ) : (
        <LightspeedMatrixProduct
          item={item}
          image={image}
          matrixItem={matrixItem}
          matrixLoading={matrixLoading}
          handleInputChange={handleInputChange}
          checkedInputs={checkedInputs}
          shortDescription={shortDescription}
        />
      )}
    </>
  );
};
export default Item;
