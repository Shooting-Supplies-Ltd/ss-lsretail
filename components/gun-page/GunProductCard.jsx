import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

const GunProductCard = ({ gun }) => {
  const slug = slugify(
    `${gun.Make}-${gun.Model ? gun.Model : gun.Type}${
      gun.Variant ? `-${gun.Variant}` : ""
    }${gun.Calibre ? `-${gun.Calibre}` : ""}`
  )
    .toLowerCase()
    .replace(".", "")
    .replace("(", "")
    .replace(")", "");

  return (
    <div
      className="block h-96 w-80 rounded-lg shadow hover:shadow-2xl"
      key={gun.ID}
    >
      <Link href={`/guns/${gun.ID}/${slug}`}>
        <a>
          <div className="relative flex justify-center h-64 overflow-hidden bg-black border-b border-white">
            <Image
              src={gun.Images[0].FullPath}
              alt={`${gun.Condition} ${gun.Make} ${
                gun.Model ? gun.Model : ""
              } ${gun.Variant ? gun.Variant : ""} ${gun.Calibre}`}
              width={320}
              height={320}
              quality={75}
              className="object-scale-down"
            />
            {/* <img
                src={gun.Images[0].FullPath}
                alt={`${gun.Condition} ${gun.Make} ${
                  gun.Model ? gun.Model : ""
                } ${gun.Variant ? gun.Variant : ""} ${gun.Calibre}`}
                className="w-full object-cover object-center"
              /> */}
          </div>
          <div className="h-32 p-4 flex flex-col bg-ssblue text-white rounded-b-lg">
            <h2 className="flex justify-center text-center uppercase font-bold">{`${
              gun.Condition
            } ${gun.Make} ${gun.Model ? gun.Model : ""} ${
              gun.Variant ? gun.Variant : ""
            } ${gun.Calibre}`}</h2>
            <p className="mt-2 flex justify-center font-bold text-lg">
              £{gun.Price}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default GunProductCard;
