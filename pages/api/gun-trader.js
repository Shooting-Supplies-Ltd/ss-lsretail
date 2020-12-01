import axios from 'axios'

export default async (req, res) => {
  const response = await axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns')
  const data = await response.data
  console.log(data)


  res.json(data)
}


