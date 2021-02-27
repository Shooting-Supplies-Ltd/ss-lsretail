import rateLimit from 'axios-rate-limit';
import axios from 'axios';
import refreshToken from './refreshToken';

const token = [];

const getToken = async (n) => {
  if (token[n] != null) {
    console.log('Cached Token');
    return token[n];
  }
  const bearer = await refreshToken();
  console.log('API Token');
  token[n] = bearer;
  return bearer;
};

const getHeader = async () => {
  const bearerToken = await getToken();
  const header = {
    Authorization: `Bearer ${bearerToken}`,
  };
  const axiosConfig = {
    baseURL: `https://api.lightspeedapp.com/API/Account/${process.env.ACCOUNT_ID}/`,
    headers: header,
  };
  return axiosConfig;
};

const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 2000, maxRPS: 1 });

export async function getItems() {
  const axiosConfig = await getHeader();
  const items = await http
    .get(
      `Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemECommerce.listOnStore=true`,
      axiosConfig
    )
    .catch((err) => err);
  return items;
}

export async function getItem(itemID) {
  const axiosConfig = await getHeader();
  const item = await http
    .get(
      `Item/${itemID}.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemECommerce.listOnStore=true`,
      axiosConfig
    )
    .catch((err) => err);
  return item;
}

export async function getItemsByCategory(categoryID) {
  const axiosConfig = await getHeader();
  const itemsByCategory = await http
    .get(
      `Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemECommerce.listOnStore=true&categoryID=${categoryID}`,
      axiosConfig
    )
    .catch((err) => err);
  return itemsByCategory;
}

export async function getAmmo() {
  const axiosConfig = await getHeader();
  const ammo = await http
    .get(
      `Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[23,46,218]&ItemECommerce.listOnStore=true`,
      axiosConfig
    )
    .catch((err) => err);
  return ammo;
}

export async function getAccessories() {
  const axiosConfig = await getHeader();
  const accessories = await http
    .get(
      `Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[77, 153, 73, 2, 262, 163, 21, 78, 261, 24, 263, 76, 166, 212, 56, 59, 42, 103, 104, 236, 66, 145, 207]&ItemECommerce.listOnStore=true`,
      axiosConfig
    )
    .catch((err) => err);
  return accessories;
}

export async function getOptics() {
  const axiosConfig = await getHeader();
  const optics = await http
    .get(
      `Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[39, 109, 91, 105, 267, 4, 36, 27, 37, 80, 29, 16, 150, 266, 259]&ItemECommerce.listOnStore=true`,
      axiosConfig
    )
    .catch((err) => err);
  return optics;
}

export async function getSecurity() {
  const axiosConfig = await getHeader();
  const security = await http
    .get(
      `Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[206, 124, 131]&ItemECommerce.listOnStore=true`,
      axiosConfig
    )
    .catch((err) => err);
  return security;
}

export async function getMaintenance() {
  const axiosConfig = await getHeader();
  const maintenance = await http
    .get(
      `Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[164, 52, 106, 86, 57, 14, 58, 65, 96, 83, 245, 165]&ItemECommerce.listOnStore=true`,
      axiosConfig
    )
    .catch((err) => err);
  return maintenance;
}

export async function getClothing() {
  const axiosConfig = await getHeader();
  const clothing = await http
    .get(
      `Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemShops.qoh=%3E%3D,1&Category.categoryID=IN,[5]&ItemECommerce.listOnStore=true`,
      axiosConfig
    )
    .catch((err) => err);
  return clothing;
}

export async function getMatrixClothing() {
  const axiosConfig = await getHeader();
  const matrixClothing = await http
    .get(
      `ItemMatrix.json?load_relations=["Category", "Images", "ItemECommerce"]&Category.categoryID=IN,[5, 237, 202, 49, 15, 137, 235, 140, 43, 6, 179, 155, 214, 100, 162, 228, 8, 121, 51, 200, 147, 7, 151, 110, 111, 217, 210]&ItemECommerce.listOnStore=true`,
      axiosConfig
    )
    .catch((err) => err);
  return matrixClothing;
}

export async function getMatrixClothingItem(itemID) {
  const axiosConfig = await getHeader();
  const matrixClothingItem = await http
    .get(
      `ItemMatrix/${itemID}.json?load_relations=["Category", "Images", "ItemECommerce"]&ItemECommerce.listOnStore=true`,
      axiosConfig
    )
    .catch((err) => err);
  return matrixClothingItem;
}

export async function getCategory(categoryID) {
  const axiosConfig = await getHeader();
  const category = await http
    .get(`Category.json?categoryID=IN,${categoryID}&orderby=name`, axiosConfig)
    .catch((err) => err);
  return category;
}

export async function getCategories() {
  const axiosConfig = await getHeader();
  const categories = await http.get(`Category.json?orderby=name`, axiosConfig).catch((err) => err);
  return categories;
}

export async function getManufacturers(manufacturerID) {
  const axiosConfig = await getHeader();
  const manufacturers = await http
    .get(`Manufacturer.json?manufacturerID=IN,${manufacturerID}&orderby=name`, axiosConfig)
    .catch((err) => err);
  return manufacturers;
}

export async function createSale(newSale) {
  const axiosConfig = await getHeader();
  const createSaleData = await http
    .post(`Sale.json`, newSale, axiosConfig)
    .catch((error) => console.error(error.data).then((res) => res))
    .catch((err) => console.error(err.data));
  const saleData = await createSaleData;
  return saleData;
}
