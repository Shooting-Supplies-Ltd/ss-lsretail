import Image from 'next/image'
import Link from 'next/link'


const LinksSection = () => {
  return (
    <div>
      <ul className="my-8 mx-24 flex justify-between">
        <li>
          <Link href="/">
            <a>
              <Image
                src="https://res.cloudinary.com/shooting-supplies/image/upload/v1573222842/misc/AirArmsApproved.jpg"
                width={160}
                height={70} />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <Image
                src="https://res.cloudinary.com/shooting-supplies/image/upload/v1573222197/misc/special-offers_ftxhmi_eqolxg.png"
                width={160}
                height={70} />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <Image
                src="https://res.cloudinary.com/shooting-supplies/image/upload/v1573564830/logos/Tackle-and-Guns-Star-Shop-1_gixwr1_th35jk.jpg"
                width={160}
                height={70} />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <Image
                src="https://res.cloudinary.com/shooting-supplies/image/upload/v1573565462/misc/Deko-SpreadTheCost_lw6axe_pvrogz.png"
                width={160}
                height={70} />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <Image
                src="https://res.cloudinary.com/shooting-supplies/image/upload/v1573222241/misc/find-us-guntrader_pzj8vm.jpg"
                width={160}
                height={70} />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <Image
                src="https://res.cloudinary.com/shooting-supplies/image/upload/v1573222843/misc/Opening-Times_rufl99.jpg"
                width={160}
                height={70} />
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default LinksSection