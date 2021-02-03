import { ImFacebook2, ImInstagram, ImTwitter } from 'react-icons/im'

const HelpBanner = () => {
  return (
    <div className="h-72 flex flex-col justify-center items-center bg-gray-800">
      <h3 className="text-3xl font-bold text-white">Need help? Call us On <span className="text-ssorange">01527 831261</span></h3>
      <p className="mt-2 text-lg text-white">Phone Lines are open Monday to Thursday & Saturday 09:00am to 17:30pm, late on Friday 09:00am to 19:00am</p>
      <h3 className="pt-8 text-white text-2xl text-center">Get In Touch & Follow for Updates</h3>
      <div className="pt-4 flex justify-center">
        <ul className="flex space-x-8 text-4xl">
          <li className="text-white hover:text-ssorange"><ImFacebook2 /></li>
          <li className="text-white hover:text-ssorange"><ImInstagram /></li>
          <li className="text-white hover:text-ssorange"><ImTwitter /></li>
        </ul>
      </div>
    </div>
  )
}

export default HelpBanner