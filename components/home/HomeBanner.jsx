import Image from 'next/image'

const HomeBanner = () => {
  return (
    <div className="border-b border-solid-2 border-black">
      <Image
        src={"/banners/Slide1.png"}
        layout="responsive"
        width={1920}
        height={480}
      />
    </div>
  )
}

export default HomeBanner