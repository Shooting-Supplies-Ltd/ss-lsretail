import Image from "next/image";
import LsProductHead from "../seo/LightspeedProduct";
import { useRouter } from "next/router";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import MatrixFilter from "../filters/productFilters/MatrixFilter";

export default function LightspeedMatrixProduct({
  item,
  matrixItem,
  image,
  shortDescription,
  matrixLoading,
  handleInputChange,
  checkedInputs,
}) {
  const router = useRouter();

  const { cartCount, addItem } = useShoppingCart();

  const productDescriptionLong = () => ({
    __html: item.ItemECommerce ? item.ItemECommerce.longDescription : "",
  });

  const price = parseFloat(item.Prices?.ItemPrice[0]?.amount)
    .toFixed(2)
    .replace(".", "");

  const Mailto = ({ email, subject = "", body = "", children }) => {
    let params = subject || body ? "?" : "";
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

    return <a href={`mailto:${email}${params}`}>{children}</a>;
  };

  return (
    <>
      <LsProductHead item={item} />
      <main>
        <div className="lg:flex mx-4 lg:mx-12 mb-8 lg:my-12">
          <div className="lg:w-4/6 lg:border-r-2 lg:border-ssblue">
            <div
              className="hidden lg:flex justify-center items-center"
              style={{ height: "620px" }}
            >
              {matrixLoading && (
                <img src="/loading.gif" alt="Loading spinner" />
              )}
              {!matrixLoading && (
                <Image
                  src={`${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.webp`}
                  alt={`Buy ${item.description} at Shooting Supplies Ltd`}
                  width={600}
                  height={600}
                  className="object-scale-down"
                />
              )}
            </div>
            <div className="lg:hidden flex justify-center items-center">
              <Image
                src={`${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.webp`}
                alt={`Buy ${item.description} at Shooting Supplies Ltd`}
                width={300}
                height={300}
                className="object-scale-down"
              />
            </div>
            <h1 className="lg:hidden mt-4 text-4xl font-black">
              {item.description}
            </h1>
            <div id="fulldescription" className="mt-4">
              <h2 className="hidden lg:block text-3xl lg:ml-24 uppercase font-black">
                Product Details
              </h2>
              <div
                className="mt-8 lg:mt-4 lg:mx-24 prose max-w-none"
                dangerouslySetInnerHTML={productDescriptionLong()}
              />
            </div>
          </div>

          <div className="lg:w-2/6 lg:ml-4">
            <div className="lg:mx-4">
              <h1 className="hidden lg:block text-4xl font-black">
                {item.description}
              </h1>

              <div className="mt-8 lg:mt-2">
                {matrixItem && matrixItem.ItemShops.ItemShop[0].qoh > 0 && (
                  <p>
                    <span className="text-green-500 font-medium uppercase">
                      In Stock
                    </span>
                  </p>
                )}
                {matrixItem && matrixItem.ItemShops.ItemShop[0].qoh == 0 && (
                  <p>
                    <span className="text-red-500 font-medium uppercase">
                      Out of Stock
                    </span>
                  </p>
                )}
                {matrixItem && matrixItem.ItemShops.ItemShop[0].backorder >= 1 && (
                  <p>
                    <span className="text-red-500 font-medium uppercase">
                      Out of Stock = On Order
                    </span>
                  </p>
                )}
              </div>

              <p className="mt-4 font-bold text-4xl uppercase">
                {formatCurrencyString({
                  value: price,
                  currency: "GBP",
                })}
              </p>

              <p
                className="hidden lg:block mt-12 prose"
                dangerouslySetInnerHTML={shortDescription}
              />

              <MatrixFilter
                item={item}
                handleInputChange={handleInputChange}
                checkedInputs={checkedInputs}
              />
              {/* <div className="mt-8">
                {matrixItem && matrixItem.ItemShops.ItemShop[0].qoh > 0 && (
                  <button
                    onClick={() =>
                      addItem(getSingleProductFromMatrix(checkedInputs))
                    }
                    aria-label={`Add ${matrixItem.description} to your cart`}
                    className="p-3 bg-ssblue focus:bg-blue-400 text-white font-bold rounded mr-2"
                  >
                    Add to Cart
                  </button>
                )}
                {matrixItem && matrixItem.ItemShops.ItemShop[0].qoh == 0 && (
                  <button
                    onClick={() =>
                      addItem(getSingleProductFromMatrix(checkedInputs))
                    }
                    aria-label={`Add ${matrixItem.name} to your cart`}
                    className="p-3 bg-black text-gray-400 font-bold rounded mr-2"
                    disabled
                  >
                    Add to Cart
                  </button>
                )}
                {cartCount > 0 ? (
                  <Link href="/cart">
                    <button className="p-3 bg-fabred text-white font-bold rounded">
                      View Cart
                    </button>
                  </Link>
                ) : (
                  ""
                )}
              </div> */}

              <h3 className="mt-8 lg:mt-20 text-xl font-bold uppercase">
                Please contact us to buy this item or for further information
              </h3>

              <div className="mt-8 flex space-x-4">
                <a
                  href="tel:01527831261"
                  className="btn-blue hover:bg-green-600"
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
