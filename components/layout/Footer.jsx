import Link from "next/link";
import Image from "next/image";

const Footer = () => (
  <footer className="hidden lg:block h-72 bg-ssblue">
    <div className="lg:flex mx-20">
      <div className="w-full lg:w-3/6 py-12 px-4">
        <h2 className="mb-2 font-bold text-white text-2xl uppercase">
          Shooting Supplies Ltd
        </h2>
        <p className="inline-block text-white pr-20">
          The Midlands leading Shooting Supplies Store. Offering all you need
          for Target, Clay & Hunting Sports, with easy access from the M5 & M42
          motorways and onsite parking.
          <p className="mt-2">T: 01527831261</p>
          <p>E: info@shootingsuppliesltd.co.uk</p>
        </p>
      </div>
      <div className="mx-12 py-12 w-3/6 xl:grid grid-cols-3 gap-4">
        <div>
          <h3 className="mb-2 text-white font-bold text-xl uppercase">
            Terms & Conditions
          </h3>
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
        <div>
          <h3 className="mb-2 text-white font-bold text-xl uppercase">
            About Us
          </h3>
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
        <div>
          <h3 className="mb-2 text-white font-bold text-xl uppercase">
            More...
          </h3>
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
              <a
                href="https://fabdefense.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ssorange"
              >
                FAB Defense
              </a>
            </li>
            <li>
              <Link href="/tippmann-arms">
                <a className="hover:text-ssorange">Tippmann Arms</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="bg-ssblue border-t border-gray-50">
      <p class="text-center text-white py-8">
        © Shooting Supplies Ltd 2021 - All rights reserved
      </p>
    </div>
    <script rel="preconnect">
      var clicky_site_ids = clicky_site_ids || [];
      clicky_site_ids.push(101209513);
    </script>
    <script rel="preconnect" async src="https://static.getclicky.com/js" />
  </footer>
);

export default Footer;
