import Link from 'next/link';
import Image from 'next/image';
import slugify from 'slugify';
import { useRouter } from 'next/router';

const ProductCard = ({ item }) => {
  const router = useRouter();
  const slug = slugify(item.description.replace('/', '-'))
    .replace(/["'.,]/g, '')
    .toLocaleLowerCase();
  const name = item.description;
  const imageUrl = `${item.Images?.Image?.baseImageURL}/w_240/${item.Images?.Image?.publicID}.webp`;

  return (
    <div className="block h-80 border-2 border-gray-300 rounded-lg" key={item.itemID}>
      <Link href={`${router.pathname}/${item.itemID ? item.itemID : item.itemMatrixID}/${slug}`}>
        <a>
          <div className="flex justify-center h-48 overflow-hidden">
            <Image src={imageUrl} alt={`Image of ${name}`} width={240} height={240} />
          </div>
          <div className="h-32 p-4 flex flex-col bg-ssblue text-white rounded-b-lg">
            <h2 className="flex justify-center text-center uppercase">{name}</h2>
            <div className="mt-2 text-center font-bold text-lg">
              {item.CustomFieldValues.CustomFieldValue.map((field) => {
                if (field.customFieldID === '5' && field.value === 'true') {
                  return (
                    <>
                      <p>
                        <span className="line-through mr-2">
                          £{parseFloat(item.Prices.ItemPrice[1].amount).toFixed(2)}
                        </span>
                        £{parseFloat(item.Prices.ItemPrice[0].amount).toFixed(2)}
                      </p>
                      <span className="relative z-10 top-2 left-36 font-semibold inline-block py-1 px-2 uppercase rounded-md text-white bg-red-600 uppercase last:mr-0 mr-1">
                        Sale
                      </span>
                    </>
                  );
                }
              })}
              <p className="mt-2 flex justify-center font-bold text-lg ">
                £{parseFloat(item.Prices.ItemPrice[0].amount).toFixed(2)}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
