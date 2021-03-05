import Link from 'next/link';
import slugify from 'slugify';
import { useRouter } from 'next/router';

const ProductCard = ({ item, key }) => {
  const router = useRouter();
  const slug = slugify(item.description.replace('/', '-')).toLocaleLowerCase();
  const name = item.description;
  const imageUrl = `${item.Images?.Image?.baseImageURL}/w_240/${item.Images?.Image?.publicID}.jpg`;

  return (
    <div className="block h-80 border-2 border-gray-300 rounded-lg" key={key}>
      <Link href={`${router.pathname}/[id]?id=${item.itemID ? item.itemID : item.itemMatrixID}&slug=${slug}`}>
        <a>
          <div className="flex justify-center h-48 overflow-hidden">
            <img src={imageUrl} alt={`Image of ${name}`} className="w-60" />
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
