import Head from 'next/head';
import Layout from '../components/layout/Layout';

const Contact = () => (
  <Layout>
    <Head>
      <title>Contact US | Shooting Supplies Ltd</title>
      <meta name="description" content="Contact us with any of your questions, we're always happy to help." />
    </Head>
    <main className="mx-96 my-12">
      <h1 className="text-3xl font-black">Contact Us</h1>
      <div className="my-8">
        <p>
          <strong>Tel: </strong>
          <a href="tel:01527831261" className="hover:text-ssorange">
            01527 831261
          </a>
        </p>
        <p className="mt-2">
          <strong>Email: </strong>
          <a href="mailto:info@shootingsuppliesltd.co.uk" className="hover:text-ssorange">
            info@shootingsuppliesltd.co.uk
          </a>
        </p>
        <p>
          <strong>Address: </strong>
          <address className="mt-2 inline-block">38, Sherwood Road, Bromsgrove, Worcestershire, B60 3DR</address>
        </p>
      </div>
      <hr className="my-8" />
      <div>
        <h2 className="font-bold text-xl mb-2">Opening Times</h2>
        <ul>
          <li>Mon - Closed</li>
          <li>Tue - 09:00 - 17:30</li>
          <li>Wed - 09:00 - 17:30</li>
          <li>Thu - 09:00 - 17:30</li>
          <li>Fri - 09:00 - 19:00</li>
          <li>Sat - 09:00 - 17:30</li>
          <li>Sun - Closed</li>
        </ul>
      </div>
      {/* <div className="mt-8 text-red-700">
        <p>
          During the current Covid Restrictions we are operating at reduced opening hours and serving customers by
          appointment only.
        </p>
        <p className="mt-4">
          Please call us on{' '}
          <a href="tel:01527831261" className="text-ssblue">
            01527 831261
          </a>{' '}
          to book your slot.
        </p>
        <p className="mt-4">Tue-Sat: 10:00 - 14:00</p>
      </div> */}
      <hr className="my-8" />
      {/* <h2 className="text-xl font-bold mb-8">Send Us a Message</h2> */}
      {/* <form className="mt-4">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="first-name">
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-blue-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="first-name"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="last-name">
              Surname
            </label>
            <input
              className="appearance-none block w-full bg-blue-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="surname"
              type="text"
              placeholder="Surname"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none block w-full bg-blue-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              className="appearance-none block w-full bg-blue-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="phone"
              type="text"
              placeholder="Phone"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className=" no-resize appearance-none block w-full bg-blue-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-y"
              id="message"
              placeholder="Message"
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <button
              className="shadow bg-ssblue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Send
            </button>
          </div>
          <div className="md:w-2/3" />
        </div>
      </form> */}
    </main>
  </Layout>
);

export default Contact;
