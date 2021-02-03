import Link from 'next/link'
import { MdPhone } from 'react-icons/md'

const TopBar = () => {
  return (
    <div className="flex mx-12 py-1">
      <div className="w-2/6"></div>
      <div className="w-2/6"><p className="text-center">Get the latest from Shooting Supplies on our <Link href="/"><a><span className="text-ssorange hover:text-ssblue underline">Blog</span></a></Link></p></div>
      <div className="w-2/6"><p className="text-right">Call Us: <span className="text-ssorange hover:text-ssblue underline"><a href="tel:01527831261">01527831261</a></span></p></div >
    </div >
  )
}

export default TopBar