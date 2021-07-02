import Image from "next/image";
import LsProductHead from "../seo/LightspeedProduct";
import { useRouter } from "next/router";
import { formatCurrencyString } from "use-shopping-cart";

export default function LightspeedMatrixProduct({ item }) {
  const router = useRouter();
  const productDescriptionLong = () => ({
    __html: item.ItemECommerce ? item.ItemECommerce.longDescription : "",
  });
  const productDescriptionShort = () => ({
    __html: item.ItemECommerce ? item.ItemECommerce.shortDescription : "",
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
        <div className="flex lg:mx-12 lg:my-12">
          <div className="lg:w-4/6 border-r-2 border-ssblue">
            <div
              className="flex justify-center items-center"
              style={{ height: "620px" }}
            >
              <Image
                src={`${item.Images.Image.baseImageURL}/w_600/${item.Images.Image.publicID}.webp`}
                alt={`Buy ${item.description} at Shooting Supplies Ltd`}
                width={600}
                height={600}
                className="object-scale-down"
              />
            </div>
            <div id="fulldescription" className="mt-4 mb-12">
              <h2 className="text-3xl lg:ml-24 uppercase font-black">
                Product Details
              </h2>
              <div
                className="mt-4 mx-24 prose max-w-none text-lg"
                dangerouslySetInnerHTML={productDescriptionLong()}
              />
            </div>
          </div>

          <div className="lg:w-2/6 ml-4">
            <div className="mx-4">
              <h1 className="text-4xl font-black">{item.description}</h1>

              <div className="flex space-x-20">
                {item.ItemShops ? (
                  item.ItemShops.ItemShop[0].qoh > 0 ? (
                    <p className="mt-1 text-green-500 font-bold uppercase">
                      In Stock
                    </p>
                  ) : item.ItemShops.ItemShop[0].backorder >= 1 ? (
                    <p className="mt-1 text-red-500 font-bold uppercase">
                      Out of Stock - On Order
                    </p>
                  ) : (
                    <p className="mt-1 text-red-500 font-bold uppercase">
                      Out of Stock
                    </p>
                  )
                ) : (
                  ""
                )}
              </div>

              <p className="mt-4 font-bold text-4xl uppercase">
                {formatCurrencyString({
                  value: price,
                  currency: "GBP",
                })}
              </p>

              <p
                className="mt-4 prose"
                dangerouslySetInnerHTML={productDescriptionShort()}
              />

              <h3 className="mt-20 text-xl font-semibold uppercase">
                Please Contact Us to Purchase this item or for more information
              </h3>

              <div className="mt-8 flex space-x-4">
                <a
                  href="tel:01527831261"
                  className="flex items-center justify-center h-10 w-24 mr-4 bg-ssblue hover:bg-green-600 text-lg text-white font-bold uppercase rounded"
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
