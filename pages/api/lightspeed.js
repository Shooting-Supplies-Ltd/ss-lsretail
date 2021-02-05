import axios from 'axios'
import refreshToken from './refreshToken'


async function getHeader() {
  let token = await refreshToken()

  const header = {
    Authorization: `Bearer ${token}`,
  };

  const axiosConfig = {
    baseURL: `https://api.lightspeedapp.com/API/Account/${process.env.ACCOUNT_ID}/`,
    headers: header
  }

  return axiosConfig
}

export async function getItems() {
  let axiosConfig = await getHeader()
  return await axios.get(`Item.json?load_relations=["Category", "Images", "ItemShops", "CustomFieldValues"]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
}

export async function getItem(itemID) {
  let axiosConfig = await getHeader()
  return await axios.get(`Item/${itemID}.json?load_relations=["Category", "Images", "ItemShops", "CustomFieldValues", "ItemECommerce"]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
}

export async function getAmmo() {
  let axiosConfig = await getHeader()
  return await axios.get(`Item.json?load_relations=["ItemShops", "Category", "Images", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[23,46,218]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
}

export async function getAccessories() {
  let axiosConfig = await getHeader()
  return await axios.get(`Item.json?load_relations=["ItemShops", "Category", "Images", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[77, 153, 73, 2, 262, 163, 21, 78, 261, 24, 263, 76, 166, 212, 56, 59, 42, 103, 104, 236, 66, 145, 207]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
}

export async function getOptics() {
  let axiosConfig = await getHeader()
  return await axios.get(`Item.json?load_relations=["ItemShops", "Category", "Images", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[39, 109, 91, 105, 267, 4, 36, 27, 37, 80, 29, 16, 150, 266, 259]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
}

export async function getSecurity() {
  let axiosConfig = await getHeader()
  return await axios.get(`Item.json?load_relations=["ItemShops", "Category", "Images", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[206, 124, 131]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
}

export async function getMaintenance() {
  let axiosConfig = await getHeader()
  return await axios.get(`Item.json?load_relations=["ItemShops", "Category", "Images", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[164, 52, 106, 86, 57, 14, 58, 65, 96, 83, 245, 165]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
}

export async function getClothing() {
  let axiosConfig = await getHeader()
  return await axios.get(`Item.json?load_relations=["ItemShops", "Category", "Images", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[5]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
}

export async function getCategories(categoryID) {
  let axiosConfig = await getHeader()
  return await axios.get(`Category.json?categoryID=IN,${categoryID}`, axiosConfig).catch(err => console.error(err.data))
}

export async function getManufacturers(manufacturerID) {
  let axiosConfig = await getHeader()
  return await axios.get(`Manufacturer.json?manufacturerID=IN,${manufacturerID}`, axiosConfig).catch(err => console.error(err.data))
}

export async function createSale(newSale) {
  let axiosConfig = await getHeader()
  return await axios.post(`Sale.json`, newSale, axiosConfig).catch(error => console.error(error.data).then(res => { return res })).catch(err => console.error(err.data))
}

