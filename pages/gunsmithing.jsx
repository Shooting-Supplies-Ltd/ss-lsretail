import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/layout/Layout';

export default function Gunsmithing() {
  return (
    <Layout>
      <Head>
        <title className="uppercase">Gunsmithing | Shooting Supplies Ltd</title>
        <meta name="description" content="Professional gun repair and refurbishment" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="gun repair, gun refurbishment, gun servicing, gun maintenance" />
        <meta property="og:title" content="Gunsmithing | Shooting Supplies Ltd" />
        <meta property="og:description" content="Professional gun repair and refurbishment" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/shooting-supplies/image/upload/v1573223185/Blog/gunsmith.webp"
        />
        <meta property="og:url" content="https://shootingsuppliesltd.co.uk/gunsmithing" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta charSet="UTF-8" />
      </Head>
      <main className="mx-72 my-12">
        <h1 className="text-3xl font-black uppercase">Gunsmithing</h1>
        <div className="mt-8 flex justify-center">
          <Image
            src="https://res.cloudinary.com/shooting-supplies/image/upload/v1573223185/Blog/gunsmith.webp"
            width={645}
            height={300}
          />
        </div>
        <p className="mt-8">
          We provide professional repair and refurbishment services. Whether you need to fix an old firearm, repair a
          broken firearm, want to add scopes and accessories to your favorite firearm, or have a firearm that needs a
          thorough cleaning.
        </p>
        <p className="mt-2">
          We can help! Call us on{' '}
          <a href="tel:01527831261" className="text-ssblue">
            01527 831 261
          </a>{' '}
          or pop in to our store for further information.
        </p>
        <h2 className="mt-8 text-xl font-bold uppercase">Our Gunsmithing Services</h2>
        <ul className="ml-4 mt-4 list-disc">
          <li>Shotgun Servicing & Repairs</li>
          <li>Pistol & Rifle Repairs</li>
          <li>Air Guns Servicing & Repairs</li>
          <li>Barrel Screw Cutting</li>
          <li>Shortening & Proofing</li>
          <li>Trigger Tuning</li>
        </ul>
        <p className="mt-4">
          As an Air Arms approved service center we also provide servicing and repairs for most airguns.
        </p>
      </main>
    </Layout>
  );
}
