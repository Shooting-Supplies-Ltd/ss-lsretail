import Link from 'next/link'

const Footer = () => {
  return (
    <div className="h-96 bg-gray-900">
      <footer className="mx-36 grid grid-cols-4 gap-4 bg-gray-900">
        <div className="my-12 flex flex-col">
          <h3 className="mb-2 text-white font-bold text-xl">About Us</h3>
          <ul className="text-white space-y-1">
            <li>
              <Link href="/blog">
                <a>
                  About Us
              </a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a>
                  Contact Us
              </a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a>
                  Privacy Policy
              </a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a>
                  Blog
              </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mx-12 my-12 flex flex-col">
          <h3 className="mb-2 text-white font-bold text-xl">Delivery & Returns</h3>
          <ul className="text-white space-y-1">
            <li>
              <Link href="/terms">
                <a>
                  Terms & Conditions
              </a>
              </Link>
            </li>
            <li>
              <Link href="/returns">
                <a>
                  Returns Policy
              </a>
              </Link>
            </li>
            <li>
              <Link href="/privacy">
                <a>
                  Privacy Policy
              </a>
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
        <div className="mx-12 my-12 flex flex-col">
          <h3 className="mb-2 text-white font-bold text-xl">Customer Support</h3>
          <ul className="text-white space-y-1">
            <li>
              <Link href="/customer-account">
                <a>
                  Your Account
              </a>
              </Link>
            </li>
            <li>
              <Link href="/clothing-sizes">
                <a>
                  Clothing Sizes
              </a>
              </Link>
            </li>
            <li>
              <Link href="/trade-enquiries">
                <a>
                  Trade Enquiries
              </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mx-12 my-12 flex flex-col">
          <h3 className="mb-2 text-white font-bold text-xl">More...</h3>
          <ul className="text-white space-y-1">
            <li>
              <Link href="/finance">
                <a>
                  Finance
              </a>
              </Link>
            </li>
            <li>
              <Link href="/our-brands">
                <a>
                  Our Brands
              </a>
              </Link>
            </li>
            <li>
              <Link href="/gunsmithing">
                <a>
                  Gunsmithing Service
              </a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a>
                  FAB Defence
              </a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a>
                  Tippmann Arms
              </a>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

// const Footer = () => {
//   return (
//     <div className="w-full h-64 bg-gray-900">
//       <div className="hidden lg:flex pb-8 pt-8 flex text-white justify-around border-t border-black mx-16">
//         <div id="about-us-footer-menu">
//           <h3 className="font-black text-xl">ABOUT US</h3>
//           <hr className="mb-4 mt-1" />
//           <ul>
//             <li>
//               <g-link to="/blog" className="hover:text-ssorange font-semibold text-lg">BLOG</g-link>
//             </li>
//             <li>
//               <g-link to="/blog/about-us" className="hover:text-ssorange font-semibold text-lg">ABOUT US</g-link>
//             </li>
//             <li>
//               <g-link
//                 to="/blog/contact-us"
//                 className="hover:text-ssorange font-semibold text-lg"
//               >CONTACT US</g-link>
//             </li>
//             <li>
//               <g-link
//                 to="/blog/privacy-policy"
//                 className="hover:text-ssorange font-semibold text-lg"
//               >PRIVACY POLICY</g-link>
//             </li>
//           </ul>
//         </div>
//         <div id="products-footer-menu">
//           <h3 className="font-black text-xl">PRODUCTS</h3>
//           <hr className="mb-4 mt-1" />
//           <ul>
//             <li>
//               <g-link to="/guns" className="hover:text-ssorange font-semibold text-lg">GUNS</g-link>
//             </li>
//             <li>
//               <g-link to="/optics" className="hover:text-ssorange font-semibold text-lg">OPTICS</g-link>
//             </li>
//             <li>
//               <g-link to="/accessories" className="hover:text-ssorange font-semibold text-lg">ACCESSORIES</g-link>
//             </li>
//             <li>
//               <g-link to="/security" className="hover:text-ssorange font-semibold text-lg">SECURITY</g-link>
//             </li>
//           </ul>
//         </div>
//         <div id="social-footer-menu">
//           <h3 className="font-black text-xl">FIND US ON</h3>
//           <hr className="mb-4 mt-1" />
//           <a
//             href="https://www.facebook.com/ShootingSuppliesLTD/"
//             target="_blank"
//             className="hover:text-ssorange mr-4"
//           >

//           </a>

//           <a
//             href="https://twitter.com/shootingsupplys"
//             target="_blank"
//             className="hover:text-ssorange mr-4"
//           >

//           </a>

//           <a
//             href="https://www.instagram.com/shootingsupplies/"
//             target="_blank"
//             className="hover:text-ssorange mr-4"
//           >

//           </a>

//           <a
//             href="mailto:info@shootingsuppliesltd.co.uk"
//             target="_blank"
//             className="hover:text-ssorange mr-4"
//           >

//           </a>
//         </div>

//         <div id="contact-us-footer-menu">
//           <h3 className="font-black text-xl">CONTACT US</h3>
//           <hr className="mb-4 mt-1" />
//           <p>38 SHERWOOD ROAD, BROMSGROVE, B60 3DR</p>
//           <p>TEL: 01527 31 261</p>
//           <p className="hover:text-ssorange">
//             EMAIL:
//           <a href="mailto:info@shootingsuppliesltd.co.uk"> info@shootingsuppliesltd.co.uk</a>
//           </p>


//         </div>
//       </div>
//     </div>
//   )
// }

export default Footer