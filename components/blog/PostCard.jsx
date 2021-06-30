import Link from 'next/link';

export default function PostCard({ item }) {
  return (
    <div className="block h-80 border-2 border-gray-300 rounded-lg">
      <Link href={`/blog/[slug]?slug=${item.slug?.current}`}>
        <a>
          <div className="flex justify-center h-48 overflow-hidden">
            <img src={item.mainImage} alt={item.title} className="w-80 object-scale-down" />
          </div>
          <div className="h-32 p-4 flex flex-col bg-ssblue text-white hover:text-ssorange rounded-b-lg">
            <h2 className="flex justify-center text-center text-xl font-bold uppercase">{item.title}</h2>
          </div>
        </a>
      </Link>
    </div>
  );
}
