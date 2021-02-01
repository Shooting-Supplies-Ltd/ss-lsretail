import axios from 'axios'

export async function getGuns() {
  return axios.get(`https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns`).catch(err => console.error(err.data))
}