import Head from 'next/head';

export default function Finance() {
  return (
    <>
      <Head>
        <title>Finance | Shooting Supplies Ltd</title>
        <meta name="description" content="We offer finance on in-store purchases through Deko" />
      </Head>
      <div className="mx-8 my-8 xl:mx-72 xl:my-12">
        <h1 id="privacy" className="mb-4 font-black text-4xl">
          Finance
        </h1>
        <p>
          Finance is currently only available to our 'in-store' customers and is provided by Deko, we shall be bringing
          finance and checkout options to the website in the very near future. Keep an eye out for that!
        </p>
      </div>
    </>
  );
}
