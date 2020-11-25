import Link from 'next/link'

const Footer = () => {
  return (
    <div className="w-full h-64 bg-ssblue">
      <div className="hidden lg:flex pb-8 pt-8 flex text-white justify-around border-t border-black mx-16">
        <div id="about-us-footer-menu">
          <h3 className="font-bold text-xl">ABOUT US</h3>
          <hr className="mb-4 mt-1" />
          <ul>
            <li>
              <g-link to="/blog" className="hover:text-ssorange font-semibold text-lg">BLOG</g-link>
            </li>
            <li>
              <g-link to="/blog/about-us" className="hover:text-ssorange font-semibold text-lg">ABOUT US</g-link>
            </li>
            <li>
              <g-link
                to="/blog/contact-us"
                className="hover:text-ssorange font-semibold text-lg"
              >CONTACT US</g-link>
            </li>
            <li>
              <g-link
                to="/blog/privacy-policy"
                className="hover:text-ssorange font-semibold text-lg"
              >PRIVACY POLICY</g-link>
            </li>
          </ul>
        </div>
        <div id="products-footer-menu">
          <h3 className="font-bold text-xl">PRODUCTS</h3>
          <hr className="mb-4 mt-1" />
          <ul>
            <li>
              <g-link to="/guns" className="hover:text-ssorange font-semibold text-lg">GUNS</g-link>
            </li>
            <li>
              <g-link to="/optics" className="hover:text-ssorange font-semibold text-lg">OPTICS</g-link>
            </li>
            <li>
              <g-link to="/accessories" className="hover:text-ssorange font-semibold text-lg">ACCESSORIES</g-link>
            </li>
            <li>
              <g-link to="/security" className="hover:text-ssorange font-semibold text-lg">SECURITY</g-link>
            </li>
          </ul>
        </div>
        <div id="social-footer-menu">
          <h3 className="font-bold text-xl">FIND US ON</h3>
          <hr className="mb-4 mt-1" />
          <a
            href="https://www.facebook.com/ShootingSuppliesLTD/"
            target="_blank"
            className="hover:text-ssorange mr-4"
          >

          </a>

          <a
            href="https://twitter.com/shootingsupplys"
            target="_blank"
            className="hover:text-ssorange mr-4"
          >

          </a>

          <a
            href="https://www.instagram.com/shootingsupplies/"
            target="_blank"
            className="hover:text-ssorange mr-4"
          >

          </a>

          <a
            href="mailto:info@shootingsuppliesltd.co.uk"
            target="_blank"
            className="hover:text-ssorange mr-4"
          >

          </a>
        </div>

        <div id="contact-us-footer-menu">
          <h3 className="font-bold text-xl">CONTACT US</h3>
          <hr className="mb-4 mt-1" />
          <p className="font-semibold text-lg">38 SHERWOOD ROAD, BROMSGROVE, B60 3DR</p>
          <p className="font-semibold text-lg">TEL: 01527 831 261</p>
          <p className="font-semibold text-lg hover:text-ssorange">
            EMAIL:
          <a href="mailto:info@shootingsuppliesltd.co.uk">INFO@SHOOTINGSUPPLIESLTD.CO.UK</a>
          </p>


        </div>
      </div>
    </div>
  )
}

export default Footer