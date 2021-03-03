import Head from 'next/head';
import Layout from '../components/layout/Layout';

export default function VirtualTour() {
  return (
    <Layout>
      <Head>
        <title>Virtual Tour | Shooting Supplies Ltd</title>
        <meta name="description" content="Have a look around our shop using Google 360" />
      </Head>
      <main className="mx-72 my-12">
        <h1 className="font-black text-3xl uppercase">Virtual Tour</h1>
        <p className="mt-4">Take a wander around our store using Google 360</p>
        <div className="mt-4 flex justify-center">
          <iframe
            title="ViewStore"
            src="https://www.google.com/maps/embed?pb=!4v1566386400468!6m8!1m7!1sCAoSLEFGMVFpcE91bVBPZTVSZ3ZLNnpJM213QXppNmFZVTRqckZ1WmFZdWplWUhy!2m2!1d52.31852767!2d-2.06014551!3f20!4f10!5f0.7820865974627469"
            width="800"
            height="400"
            frameBorder="0"
            allowFullScreen=""
          />
        </div>
      </main>
    </Layout>
  );
}
