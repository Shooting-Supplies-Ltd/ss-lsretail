import Image from 'next/image'

const HomeBanner = () => {
  return (
    <div className="border-b border-solid-2 border-black">
      <a href="https://gb.harkila.com/en-gb/shop" target="_blank">
        <Image
          src={"/banners/harkilaBanner.png"}
          alt="Harkila Click & Collect Here"
          layout="responsive"
          width={1920}
          height={480}
        />
      </a>
    </div>
  )
}

export default HomeBanner