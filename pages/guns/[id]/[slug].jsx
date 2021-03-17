import { useRouter } from 'next/router';
import Head from 'next/head';
import slugify from 'slugify';
import Layout from '../../../components/layout/Layout';

const Gun = (props) => {
  const router = useRouter();
  const { Gun } = props;

  const Mailto = ({ email, subject = '', body = '', children }) => {
    let params = subject || body ? '?' : '';
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

    return <a href={`mailto:${email}${params}`}>{children}</a>;
  };

  if (!Gun) {
    return (
      <Layout>
        <div className="grid grid-cols-3">
          <div />
          <div className="my-12 rounded-b-lg shadow-lg border-t-2 border-ssblue">
            <p>Details will be updated soon, please check back later.</p>
          </div>
          <div />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title className="uppercase">{`${Gun.Make} ${Gun.Model ? Gun.Model : ''} ${Gun.Variant ? Gun.Variant : ''} ${
          Gun.Calibre
        }`}</title>
        <meta
          name="description"
          content={`${Gun.Make} ${Gun.Model ? Gun.Model : ''} ${Gun.Variant ? Gun.Variant : ''} ${Gun.Calibre}`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={`${Gun.Make}, ${Gun.Model}, ${Gun.Variant}, ${Gun.Mechanism}, ${Gun.Type}`} />
        <meta
          property="og:title"
          content={`${Gun.Make} ${Gun.Model ? Gun.Model : ''} ${Gun.Variant ? Gun.Variant : ''} ${Gun.Calibre}`}
        />
        <meta
          property="og:description"
          content={Gun.Description ? Gun.Description : `${Gun.Make} ${Gun.Model} ${Gun.Variant} ${Gun.Type}`}
        />
        <meta property="og:image" content={Gun.Images[0].FullPath} />
        <meta property="og:url" content={`https://shootingsuppliesltd.co.uk${router.asPath}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta charSet="UTF-8" />
      </Head>
      <main className="flex">
        <div className="xl:w-1/4" />
        <div className="xl:w-2/4 flex flex-wrap justify-center">
          <div className="my-0 xl:my-12 rounded-b-lg shadow-lg border-t-2 border-ssblue">
            <div className="block w-full">
              <img
                src={Gun.Images[0].FullPath}
                alt={`${Gun.Condition} ${Gun.Make} ${Gun.Model ? Gun.Model : ''} ${Gun.Variant ? Gun.Variant : ''} ${
                  Gun.Calibre
                }`}
                className="object-scale-down"
              />
            </div>
            <h1 className="mx-4 my-8 text-4xl font-black italic uppercase">{`${Gun.Condition} ${Gun.Make} ${
              Gun.Model ? Gun.Model : ''
            } ${Gun.Variant ? Gun.Variant : ''} ${Gun.Calibre}`}</h1>
            <div className="mx-4 mt-4 border border-black">
              <table className="table-fixed w-full mb-4">
                <thead className="bg-ssblue text-white">
                  <tr>
                    <th className="w-1/2 p-2 uppercase text-xl text-left" colSpan="1">
                      Gun Details
                    </th>
                    <th className="w-1/2" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">
                      <span className="mr-2 font-bold uppercase tracking-tight">Make:</span> {Gun.Make}
                    </td>
                    <td className="p-2">
                      <span className="font-bold uppercase tracking-tight">Model:</span> {Gun.Model}
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="p-2">
                      <span className="mr-2 font-bold uppercase tracking-tight">Variant:</span> {Gun.Variant}
                    </td>
                    <td className="p-2">
                      <span className="mr-2 font-bold uppercase tracking-tight">Type:</span> {Gun.Type}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">
                      <span className="mr-2 font-bold uppercase tracking-tight">Mechanism:</span> {Gun.Mechanism}
                    </td>
                    <td className="p-2">
                      <span className="mr-2 font-bold uppercase tracking-tight">Calibre:</span> {Gun.Calibre}
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="p-2">
                      <span className="mr-2 font-bold uppercase tracking-tight">Orientation:</span> {Gun.Orientation}
                    </td>
                    <td className="p-2">
                      <span className="mr-2 font-bold uppercase tracking-tight">Trigger:</span> {Gun.Trigger}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">
                      <span className="mr-2 font-bold uppercase tracking-tight">Length:</span> {Gun.Length}
                    </td>
                    <td className="p-2">
                      <span className="mr-2 font-bold uppercase tracking-tight">Condition:</span> {Gun.Condition}
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="p-2">
                      <span className="mr-2 font-bold uppercase tracking-tight">Licence:</span> {Gun.Licence}
                    </td>
                    <td className="p-2">
                      <span className="mr-2 font-bold uppercase tracking-tight">Price:</span> £{Gun.Price}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">
                      <span className="mr-2 font-bold uppercase tracking-tight">Description:</span> {Gun.Description}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="mx-4 my-8 text-2xl font-black uppercase">
                Please Contact Us to Purchase this item or for more information
              </h3>
            </div>
            <div className="flex mx-4 my-8">
              <a
                href="tel:01527831261"
                className="flex items-center justify-center h-10 w-24 mr-4 bg-ssblue hover:bg-green-600 text-lg text-white font-bold uppercase rounded"
              >
                Call Us
              </a>
              <Mailto
                email="info@shootingsuppliesltd.co.uk"
                subject={`GUN ENQUIRY: ${Gun.Make} ${Gun.Model} ${Gun.Variant ? Gun.Variant : ''} - STOCK NUMBER: ${
                  Gun.StockNumber
                }`}
              >
                <p className="flex items-center justify-center h-10 w-24 mr-4 bg-ssblue hover:bg-green-600 text-lg text-white font-bold uppercase rounded">
                  Email
                </p>
              </Mailto>
            </div>
          </div>
        </div>
        <div className="xl:w-1/4" />
      </main>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch('https://3rdParty.guntrader.uk/ShootingSuppliesLtd/jsonGuns');
  const data = await res.json();
  const { Guns } = data;
  const filteredGuns = Guns.filter((gun) => gun.SerialNumber !== 'NVN');

  const paths = filteredGuns
    .map((gun) => {
      if (!gun.Images[0] || !gun.ID) {
        return undefined;
      }
      return {
        params: {
          id: gun.ID,
          slug: slugify(
            `${gun.Make}-${gun.Model ? gun.Model : gun.Type}${gun.Variant ? `-${gun.Variant}` : ''}`
          ).toLowerCase(),
        },
      };
    })
    .filter((path) => path);

  return { paths, fallback: true };
}

export async function getStaticProps({ params: { id } }) {
  const res = await fetch('https://3rdParty.guntrader.uk/ShootingSuppliesLtd/jsonGuns');
  const data = await res.json();
  const { Guns } = data;

  const Gun = Guns.find((gun) => gun.ID === id);

  return {
    props: {
      Gun,
    },
    revalidate: 3600,
  };
}

export default Gun;
