import Head from 'next/head'

import Layout from '../components/layout/Layout'
import HomeBanner from '../components/home/HomeBanner'
import HomeModal from '../components/home/Modal'
import LinksSection from '../components/home/LinksSection'
import Categories from '../components/home/Categories'
import HelpBanner from '../components/home/HelpBanner'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Shooting Supplies Ltd | The Midlands leading Shooting Supplier</title>
      </Head>
      <div>
        <div id="app-modal" />
        <div>
          <HomeBanner />
        </div>
        <div>
          <HomeModal />
        </div>
        <div>
          {/* <LinksSection /> */}
        </div>
        <div>
          <Categories />
        </div>
      </div>
      <HelpBanner />
    </Layout>
  )
}