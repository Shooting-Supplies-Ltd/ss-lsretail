import Link from 'next/link'
import { MdPhone } from 'react-icons/md'

const TopBar = () => {
  return (
    <div className="flex mx-12 py-1">
      <div className="w-2/6"></div>
      <div className="w-2/6"><p className="text-center text-sm">Get the latest from Shooting Supplies on our <Link href="/"><a><span className="hover:text-ssorange underline">Blog</span></a></Link></p></div>
      <div className="w-2/6"><p className="text-right text-sm">Call Us: <span className="hover:text-ssorange underline"><a href="tel:01527831261">01527831261</a></span></p></div >
    </div >
  )
}

export default TopBar