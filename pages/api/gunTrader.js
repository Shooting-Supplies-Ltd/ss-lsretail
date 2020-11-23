import axios from 'axios'

export async function getGuns() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns').catch(err => console.error(err.data))
}

export async function getShotguns() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns?filter=SG').catch(err => console.error(err.data))
}

export async function getNewShotguns() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns?filter=SG-New').catch(err => console.error(err.data))
}

export async function getUsedShotguns() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns?filter=SG-Used').catch(err => console.error(err.data))
}

export async function getOUShotguns() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns?Filter=SG-OU').catch(err => console.error(err.data))
}

export async function getSXSShotguns() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns?Filter=SG-SxS').catch(err => console.error(err.data))
}

export async function getSemiAutoShotguns() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns?Filter=SG-SemiAuto').catch(err => console.error(err.data))
}

export async function getLeftHandedShotguns() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns?Filter=SG-LH').catch(err => console.error(err.data))
}

export async function getRifles() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns?filter=RI').catch(err => console.error(err.data))
}

export async function getNewRifles() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns?filter=RI-New').catch(err => console.error(err.data))
}

export async function getUsedRifles() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns?filter=RI-Used').catch(err => console.error(err.data))
}

export async function getAirRifles() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns?filter=AR').catch(err => console.error(err.data))
}

export async function getNewAirRifles() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns?filter=AR-New').catch(err => console.error(err.data))
}

export async function getUsedAirRifles() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns?filter=AR-Used').catch(err => console.error(err.data))
}

export async function getAirPistols() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns?filter=AP').catch(err => console.error(err.data))
}

export async function getNewAirPistols() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns?filter=AP-New').catch(err => console.error(err.data))
}

export async function getUsedAirPistols() {
  return axios.get('https://3rdparty.guntrader.uk/ShootingSuppliesLtd/jsonGuns?filter=AP-Used').catch(err => console.error(err.data))
}





