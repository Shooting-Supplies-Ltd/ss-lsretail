import Image from "next/image";
import LsProductHead from "../seo/LightspeedProduct";
import MailTo from "./MailTo";
import { useRouter } from "next/router";
import { formatCurrencyString } from "use-shopping-cart";

export default function LightspeedProduct({ item }) {
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
                    <p className="mt-1 text-green-500 font-bold uppercase text-lg">
                      In Stock
                    </p>
                  ) : item.ItemShops.ItemShop[0].backorder >= 1 ? (
                    <p className="mt-1 text-red-600 font-bold uppercase text-lg">
                      Out of Stock - On Order
                    </p>
                  ) : (
                    <p className="mt-1 text-red-600 font-bold uppercase text-lg">
                      Out of Stock
                    </p>
                  )
                ) : (
                  ""
                )}
              </div>

              <div className="mt-2 text-3xl font-bold">
                {item.CustomFieldValues ? (
                  item.CustomFieldValues.CustomFieldValue.map((field) => {
                    if (field.customFieldID === "5" && field.value === "true") {
                      return (
                        <>
                          <p>
                            <span className="line-through mr-2 text-sm lg:text-md xl:text-xl">
                              £
                              {parseFloat(
                                item.Prices.ItemPrice[1].amount
                              ).toFixed(2)}
                            </span>
                            {formatCurrencyString({
                              value: price,
                              currency: "GBP",
                            })}
                            <span className="btn-red ml-4 text-xl">Sale</span>
                          </p>
                        </>
                      );
                    }
                  })
                ) : (
                  <p>
                    {formatCurrencyString({
                      value: price,
                      currency: "GBP",
                    })}
                  </p>
                )}
                {item.CustomFieldValues
                  ? item.CustomFieldValues.CustomFieldValue.map((field) => {
                      if (
                        field.customFieldID === "5" &&
                        field.value === "false"
                      ) {
                        return (
                          <>
                            <p>
                              {formatCurrencyString({
                                value: price,
                                currency: "GBP",
                              })}
                            </p>
                          </>
                        );
                      }
                    })
                  : null}
              </div>

              <p
                className="mt-12 prose text-lg"
                dangerouslySetInnerHTML={productDescriptionShort()}
              />

              <h3 className="mt-20 text-xl font-semibold uppercase">
                Please contact us to buy this item or for more information
              </h3>

              <div className="mt-8 flex space-x-4">
                <a
                  href="tel:01527831261"
                  className="btn-blue hover:bg-green-600"
                >
                  Call Us
                </a>

                <MailTo
                  email="info@shootingsuppliesltd.co.uk"
                  subject={`ITEM ENQUIRY: ${item.description} / ${item.customSku}`}
                >
                  <p className="btn-blue hover:bg-green-600">Email</p>
                </MailTo>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
