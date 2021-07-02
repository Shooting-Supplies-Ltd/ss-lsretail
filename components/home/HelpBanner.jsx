import { ImFacebook2, ImInstagram, ImTwitter } from "react-icons/im";

const HelpBanner = () => (
  <section className="border-b border-t border-ssblue">
    <div className="flex h-52 mx-20">
      <div className="w-1/2 flex flex-col self-center">
        <h3 className="text-xl xl:text-2xl font-bold text-black text-center">
          Need help? Call Us{" "}
          <span className="text-ssblue hover:text-ssorange">
            <a className="block xl:inline-block" href="tel:01527831261">
              01527 831261
            </a>
          </span>
        </h3>
        <p className="hidden xl:block mt-2 text-lg text-black text-center">
          Phone Lines are open Monday to Thursday & Saturday 09:00 to 17:30,
          late on Friday 09:00 to 19:00
        </p>
      </div>

      <div className="w-1/2 flex flex-col self-center">
        <h3 className="text-black font-semibold xl:text-2xl text-center">
          Follow Us for Updates
        </h3>
        <div className="pt-4 flex justify-center">
          <ul className="flex space-x-6 xl:space-x-8 text-3xl xl:text-3xl">
            <a
              href="https://facebook.com/ShootingSuppliesLTD"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook Page"
            >
              <li className="text-ssblue hover:text-ssorange">
                <ImFacebook2 />
              </li>
            </a>
            <a
              href="https://instagram.com/shootingsupplies"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram Page"
            >
              <li className="text-ssblue hover:text-ssorange">
                <ImInstagram />
              </li>
            </a>
            <a
              href="https://twitter.com/shootbromsgrove"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Twitter Page"
            >
              <li className="text-ssblue hover:text-ssorange">
                <ImTwitter />
              </li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default HelpBanner;
