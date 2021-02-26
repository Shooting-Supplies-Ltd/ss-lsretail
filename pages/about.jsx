import Image from 'next/image';
import Layout from '../components/layout/Layout';

export default function About() {
  return (
    <Layout>
      <main className="mx-72 my-12">
        <h1 className="text-3xl font-black uppercase">About Us</h1>
        <div className="mt-4">
          <Image
            src="https://res.cloudinary.com/shooting-supplies/image/upload/v1573564805/shop/ShootingSuppliesStore_inkcxw_qmb2bo.jpg"
            width={600}
            height={280}
            className="rounded-lg"
          />
        </div>
        <p className="mt-4">
          Shooting Supplies opened in the heart of Bromsgrove in 2002 and just four years later moved to its present
          location offering a purpose-built shop featuring a dedicated gun room on the outskirts of the town.
        </p>
        <p className="mt-2">
          The 3000 sq ft premises offers customers a huge selection of products in a convenient location, just off the
          A38 and close to both the M5 and M42 motorways, providing plenty of parking.
        </p>
        <p className="mt-2">
          Knowledgeable and experienced staff are always on hand to provide a helpful and friendly service to help
          fulfil our number one aim, for customers to leave the shop happy with their purchases and confident in the
          advice they have received. Our philosophy that ‘customer service is paramount’ is key to our business.
        </p>
        <p className="mt-2">
          Shooting Supplies cater for all disciplines of shooting, offering all of the necessary accessories, enabling
          customers to visit just one shop to fill all of their shooting needs.
        </p>
        <h2 className="mt-8 mb-4 font-bold text-lg uppercase">Have a look around our store with Google 360.</h2>
        <iframe
          title="ViewStore"
          src="https://www.google.com/maps/embed?pb=!4v1566386400468!6m8!1m7!1sCAoSLEFGMVFpcE91bVBPZTVSZ3ZLNnpJM213QXppNmFZVTRqckZ1WmFZdWplWUhy!2m2!1d52.31852767!2d-2.06014551!3f20!4f10!5f0.7820865974627469"
          width="600"
          height="450"
          frameBorder="0"
          allowFullScreen=""
        />
      </main>
    </Layout>
  );
}
