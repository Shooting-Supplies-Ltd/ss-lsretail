import { getAmmo } from '../pages/api/lightspeed'
import Layout from '../components/layout/Layout'

const Ammo = (props) => {
  console.log({ props })
  return (
    <Layout>
      Ammo
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await getAmmo()
  const data = await res.data
  console.log({ data })

  return {
    props: { data }
  }
}

export default Ammo