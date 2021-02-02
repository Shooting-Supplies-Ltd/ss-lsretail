import Link from 'next/link'

const TopBar = () => {
  return (
    <div className="mx-12 py-1 grid grid-cols-3">
      <div></div>
      <div><p className="text-center text-sm">Get the latest from Shooting Supplies on our <Link href="/"><a><span className="hover:text-ssorange underline">Blog</span></a></Link></p></div>
      <div><p className="text-right text-sm">Contact Us: <span className="hover:text-ssorange underline"><a href="tel:01527831261">01527831261</a></span></p></div>
    </div>
  )
}

export default TopBar