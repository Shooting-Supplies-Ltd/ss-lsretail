import Link from 'next/link';

const Footer = () => (
  <div className="hidden xl:block h-72 bg-blue-900">
    <footer className="mx-12 grid grid-cols-4 gap-8 ssblue">
      <div className="my-12 flex flex-col">
        <h3 className="mb-2 text-white font-bold text-xl uppercase">About Us</h3>
        <ul className="text-white space-y-1">
          <li>
            <Link href="/about">
              <a className="hover:text-ssorange">About Us</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a className="hover:text-ssorange">Contact Us</a>
            </Link>
          </li>
          <li>
            <Link href="/virtual-tour">
              <a className="hover:text-ssorange">Virtual Tour</a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a className="hover:text-ssorange">Blog</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="my-12 flex flex-col">
        <h3 className="mb-2 text-white font-bold text-xl uppercase">Terms & Conditions</h3>
        <ul className="text-white space-y-1">
          <li>
            <Link href="/terms">
              <a className="hover:text-ssorange">Terms & Conditions</a>
            </Link>
          </li>
          <li>
            <Link href="/terms#cancellation">
              <a className="hover:text-ssorange">Returns Policy</a>
            </Link>
          </li>
          <li>
            <Link href="/privacy">
              <a className="hover:text-ssorange">Privacy Policy</a>
            </Link>
          </li>
          {/* <li>
            <Link href="/blog">
              <a>
                Blog
              </a>
            </Link>
          </li> */}
        </ul>
      </div>
      <div className="my-12 flex flex-col">
        <h3 className="mb-2 text-white font-bold text-xl uppercase">Customer Support</h3>
        <ul className="text-white space-y-1">
          {/* <li>
            <Link href="/customer-account">
              <a className="hover:text-ssorange">Your Account</a>
            </Link>
          </li> */}
          {/* <li>
            <Link href="/clothing-sizes">
              <a className="hover:text-ssorange">Clothing Sizes</a>
            </Link>
          </li> */}
          <li>
            <Link href="/contact">
              <a className="hover:text-ssorange">Trade Enquiries</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="my-12 flex flex-col">
        <h3 className="mb-2 text-white font-bold text-xl uppercase">More...</h3>
        <ul className="text-white space-y-1">
          <li>
            <Link href="/finance">
              <a className="hover:text-ssorange">Finance</a>
            </Link>
          </li>
          {/* <li>
            <Link href="/our-brands">
              <a className="hover:text-ssorange">Our Brands</a>
            </Link>
          </li> */}
          <li>
            <Link href="/gunsmithing">
              <a className="hover:text-ssorange">Gunsmithing Service</a>
            </Link>
          </li>
          <li>
            <a href="https://fabdefense.co.uk" target="_blank" className="hover:text-ssorange">
              FAB Defense
            </a>
          </li>
          {/* <li>
            <Link href="/blog">
              <a className="hover:text-ssorange">Tippmann Arms</a>
            </Link>
          </li> */}
        </ul>
      </div>
    </footer>
  </div>
);

export default Footer;
