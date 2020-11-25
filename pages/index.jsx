import Layout from '../components/layout/Layout'
import HomeBanner from '../components/home/HomeBanner'
import HomeModal from '../components/home/Modal'
import LinksSection from '../components/home/LinksSection'
import Categories from '../components/home/Categories'

export default function Home() {
  return (
    <Layout>
      <div>
        <div>
          <HomeBanner />
        </div>
        <div>
          <HomeModal />
        </div>
        <div id="app-modal" />
        <div>
          <LinksSection />
        </div>
        <div>
          <Categories />
        </div>
      </div>
    </Layout>
  )
}