import Layout from '../../components/layout/Layout'
import { getCategories } from '../api/lightspeed'

export async function getStaticPaths() {
  const paths = []

  return { paths, fallback: true }
}

export async function getStaticProps() {
  const data = await getCategories()
  const categories = await data.data.Category
  console.log({ categories })

  return { props: { categories } }
}

const Categories = ({ categories }) => {
  console.log(categories)
  return (
    <Layout>
      <div>
        Categories
      </div>
    </Layout>
  )
}

export default Categories