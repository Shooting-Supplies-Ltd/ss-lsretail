import { ImFacebook2, ImInstagram, ImTwitter } from 'react-icons/im';

const HelpBanner = () => (
  <div className="h-52 xl:h-72 flex flex-col justify-center xl:items-center bg-ssblue">
    <h3 className="mx-4 text-xl xl:text-3xl font-bold text-white text-center">
      Need help? Call Us{' '}
      <span className="text-ssorange">
        <a className="block xl:inline-block" href="tel:01527831261">
          01527 831261
        </a>
      </span>
    </h3>
    <p className="hidden xl:block mt-2 xl:text-lg text-white text-center">
      Phone Lines are open Monday to Thursday & Saturday 09:00am to 17:30pm, late on Friday 09:00am to 19:00am
    </p>
    <h3 className="pt-8 text-white font-semibold xl:text-2xl text-center">Get In Touch & Follow Us for Updates</h3>
    <div className="pt-4 flex justify-center">
      <ul className="flex space-x-6 xl:space-x-8 text-3xl xl:text-4xl">
        <a href="https://facebook.com/ShootingSuppliesLTD" target="_blank" rel="noopener noreferrer">
          <li className="text-white hover:text-ssorange">
            <ImFacebook2 />
          </li>
        </a>
        <a href="https://instagram.com/shootingsupplies" target="_blank" rel="noopener noreferrer">
          <li className="text-white hover:text-ssorange">
            <ImInstagram />
          </li>
        </a>
        <a href="https://twitter.com/shootbromsgrove" target="_blank" rel="noopener noreferrer">
          <li className="text-white hover:text-ssorange">
            <ImTwitter />
          </li>
        </a>
      </ul>
    </div>
  </div>
);

export default HelpBanner;
