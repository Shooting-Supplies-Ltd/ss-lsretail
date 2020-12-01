import Layout from '../../components/layout/Layout'
import { useRouter } from 'next/router'
import Image from 'next/image'
import slugify from 'slugify'

const Gun = (props) => {
  const router = useRouter()
  const { Gun } = props

  if (!Gun) {
    return (
      <Layout>
        <div className="grid grid-cols-3">
          <div></div>
          <div className="my-12 rounded-b-lg shadow-lg border-t-2 border-ssblue">
            <p>Details will be updated soon, please check back later.</p>
          </div>
          <div></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex">
        <div className="w-1/4"></div>
        <div className="w-2/4 flex flex-wrap justify-center">
          <div className="my-12 rounded-b-lg shadow-lg border-t-2 border-ssblue">
            <div className="flex justify-center">
              <img src={Gun.Images[0].FullPath} alt={`Image of the ${Gun.Make} ${Gun.Model} ${Gun.Variant}`} className="max-h-96" />
            </div>
            <h1 className="mx-4 my-8 text-4xl font-black italic uppercase">{`${Gun.Make} ${Gun.Model} ${Gun.Variant}`}</h1>
            <div className="mx-4 mt-4 border border-black">
              <table className="table-auto w-full mb-4">
                <thead className="bg-ssblue text-white">
                  <tr>
                    <th colspan="2" className="p-2 uppercase text-xl">Gun Details</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2"><span className="mr-2 font-bold uppercase tracking-tight">Make:</span> {Gun.Make}</td>
                    <td className="p-2"><span className="font-bold uppercase tracking-tight">Model:</span> {Gun.Model}</td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="p-2"><span className="mr-2 font-bold uppercase tracking-tight">Variant:</span> {Gun.Variant}</td>
                    <td className="p-2"><span className="mr-2 font-bold uppercase tracking-tight">Type:</span> {Gun.Type}</td>
                  </tr>
                  <tr>
                    <td className="p-2"><span className="mr-2 font-bold uppercase tracking-tight">Mechanism:</span> {Gun.Mechanism}</td>
                    <td className="p-2"><span className="mr-2 font-bold uppercase tracking-tight">Calibre:</span> {Gun.Calibre}</td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="p-2"><span className="mr-2 font-bold uppercase tracking-tight">Orientation:</span> {Gun.Orientation}</td>
                    <td className="p-2"><span className="mr-2 font-bold uppercase tracking-tight">Trigger:</span> {Gun.Trigger}</td>
                  </tr>
                  <tr>
                    <td className="p-2"><span className="mr-2 font-bold uppercase tracking-tight">Length:</span> {Gun.Length}</td>
                    <td className="p-2"><span className="mr-2 font-bold uppercase tracking-tight">Condition:</span> {Gun.Condition}</td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="p-2"><span className="mr-2 font-bold uppercase tracking-tight">Licence:</span> {Gun.Licence}</td>
                    <td className="p-2"><span className="mr-2 font-bold uppercase tracking-tight">Price:</span> £{Gun.Price}</td>
                  </tr>
                  <tr>
                    <td className="p-2"><span className="mr-2 font-bold uppercase tracking-tight">Description:</span> {Gun.Description}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="mx-4 my-8 text-2xl font-black uppercase">Please Contact Us to Purchase this item or for more information</h3>
            </div>
            <div className="flex mx-4 my-8">
              <button className="flex items-center justify-center h-10 w-24 mr-4 bg-ssblue hover:bg-green-600 text-lg text-white font-bold uppercase rounded">Call</button>
              <button className="flex items-center justify-center h-10 w-24 bg-ssblue hover:bg-green-600 text-lg text-white font-bold uppercase rounded">Email</button>
            </div>
          </div>
        </div>
        <div className="w-1/4"></div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch('https://3rdParty.guntrader.uk/ShootingSuppliesLtd/jsonGuns')
  const data = await res.json()
  const { Guns } = data

  const paths = []

  const getPaths = Guns.map(gun => {
    paths.push({
      params: {
        slug: (slugify(`${gun.Make}-${gun.Model}-${gun.Variant}-${gun.ID}`).toLowerCase())
      }
    })
  })

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  console.log(slug)
  const gunSerial = slug.substr(slug.lastIndexOf('-') + 1).toUpperCase()
  console.log(gunSerial)

  const res = await fetch('https://3rdParty.guntrader.uk/ShootingSuppliesLtd/jsonGuns')
  const data = await res.json()
  const { Guns } = data

  const Gun = Guns.find(gun => gun.ID == gunSerial)

  console.log(Gun)

  return {
    props: {
      Gun
    }
  }
}

export default Gun