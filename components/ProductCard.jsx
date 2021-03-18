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
            <Image src={imageUrl} alt={`Image of ${name}`} width={200} height={200} />
          </div>
          <div className="h-32 p-4 flex flex-col bg-ssblue text-white hover:text-ssorange rounded-b-lg">
            <h2 className="flex justify-center text-center uppercase">{name}</h2>
            <p className="mt-2 flex justify-center font-bold text-lg ">
              £{parseFloat(item.Prices.ItemPrice[0].amount).toFixed(2)}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
