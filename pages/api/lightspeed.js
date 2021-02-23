import axios from 'axios'
import refreshToken from './refreshToken'
import rateLimit from 'axios-rate-limit';

const token = []

const getToken = async (n) => {
  if (token[n] != null) {
    return token[n]
  }
  const bearer = await refreshToken()
  token[n] = bearer
  return bearer
}

const getHeader = async () => {
  const token = await getToken()

  const header = {
    Authorization: `Bearer ${token}`,
  };

  const axiosConfig = {
    baseURL: `https://api.lightspeedapp.com/API/Account/${process.env.ACCOUNT_ID}/`,
    headers: header
  }

  return axiosConfig
}

const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 2000, maxRPS: 1 })

export async function getItems() {
  let axiosConfig = await getHeader()
  let items = await http.get(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
  return items
}

export async function getItem(itemID) {
  let axiosConfig = await getHeader()
  let item = await http.get(`Item/${itemID}.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
  return item
}

export async function getItemsByCategory(categoryID) {
  let axiosConfig = await getHeader()
  let itemsByCategory = await http.get(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemECommerce.listOnStore=true&categoryID=${categoryID}`, axiosConfig).catch(err => console.error(err.data))
  return itemsByCategory
}

export async function getAmmo() {
  let axiosConfig = await getHeader()
  let ammo = await http.get(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[23,46,218]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
  return ammo
}

export async function getAccessories() {
  let axiosConfig = await getHeader()
  let accessories = await http.get(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[77, 153, 73, 2, 262, 163, 21, 78, 261, 24, 263, 76, 166, 212, 56, 59, 42, 103, 104, 236, 66, 145, 207]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
  return accessories
}

export async function getOptics() {
  let axiosConfig = await getHeader()
  let optics = await http.get(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[39, 109, 91, 105, 267, 4, 36, 27, 37, 80, 29, 16, 150, 266, 259]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
  return optics
}

export async function getSecurity() {
  let axiosConfig = await getHeader()
  let security = await http.get(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[206, 124, 131]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
  return security
}

export async function getMaintenance() {
  let axiosConfig = await getHeader()
  let maintenance = await http.get(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[164, 52, 106, 86, 57, 14, 58, 65, 96, 83, 245, 165]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
  return maintenance
}

export async function getClothing() {
  let axiosConfig = await getHeader()
  let clothing = await http.get(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[5]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
  return clothing
}

export async function getMatrixClothing() {
  let axiosConfig = await getHeader()
  let matrixClothing = await http.get(`ItemMatrix.json?load_relations=["Category", "Images", "ItemECommerce"]&Category.categoryID=IN,[5, 237, 202, 49, 15, 137, 235, 140, 43, 6, 179, 155, 214, 100, 162, 228, 8, 121, 51, 200, 147, 7, 151, 110, 111, 217, 210]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
  return matrixClothing
}

export async function getMatrixClothingItem(itemID) {
  let axiosConfig = await getHeader()
  let matrixClothingItem = await http.get(`ItemMatrix/${itemID}.json?load_relations=["Category", "Images", "ItemECommerce"]&ItemECommerce.listOnStore=true`, axiosConfig).catch(err => console.error(err.data))
  return matrixClothingItem
}

export async function getCategory(categoryID) {
  let axiosConfig = await getHeader()
  let category = await http.get(`Category.json?categoryID=IN,${categoryID}&orderby=name`, axiosConfig).catch(err => console.error(err.data))
  return category
}

export async function getCategories() {
  let axiosConfig = await getHeader()
  let categories = await http.get(`Category.json?orderby=name`, axiosConfig).catch(err => console.error(err.data))
  return categories
}

export async function getManufacturers(manufacturerID) {
  let axiosConfig = await getHeader()
  let manufacturers = await http.get(`Manufacturer.json?manufacturerID=IN,${manufacturerID}&orderby=name`, axiosConfig).catch(err => console.error(err.data))
  return manufacturers
}

export async function createSale(newSale) {
  let axiosConfig = await getHeader()
  let createSaleData = await http.post(`Sale.json`, newSale, axiosConfig).catch(error => console.error(error.data).then(res => { return res })).catch(err => console.error(err.data))
  const createSale = await createSaleData
  return createSale
}

