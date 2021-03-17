import Link from 'next/link';
import slugify from 'slugify';

const GunProductCard = ({ gun }) => {
  const slug = slugify(
    `${gun.Make}-${gun.Model ? gun.Model : gun.Type}${gun.Variant ? `-${gun.Variant}` : ''}${
      gun.Calibre ? `-${gun.Calibre}` : ''
    }`
  )
    .toLowerCase()
    .replace('.', '')
    .replace('(', '')
    .replace(')', '');

  return (
    <>
      <div className="block h-80 border-2 border-gray-300 rounded-lg bg-ssblue" key={gun.ID}>
        <Link href={`/guns/${gun.ID}/${slug}`}>
          <a>
            <div className="flex h-48 overflow-hidden">
              <img
                src={gun.Images[0].FullPath}
                alt={`${gun.Condition} ${gun.Make} ${gun.Model ? gun.Model : ''} ${gun.Variant ? gun.Variant : ''} ${
                  gun.Calibre
                }`}
                className="w-full object-cover object-center"
              />
            </div>
            <div className="p-4 flex flex-col text-white hover:text-ssorange">
              <h2 className="flex justify-center text-center uppercase font-semibold">{`${gun.Condition} ${gun.Make} ${
                gun.Model ? gun.Model : ''
              } ${gun.Variant ? gun.Variant : ''} ${gun.Calibre}`}</h2>
              <p className="mt-2 flex justify-center font-bold text-xl">£{gun.Price}</p>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};

export default GunProductCard;
