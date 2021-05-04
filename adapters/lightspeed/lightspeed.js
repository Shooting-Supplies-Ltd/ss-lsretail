import api from './limit';
import refreshToken from './refreshToken';

const token = [];

const getToken = async (n) => {
  if (token[n] != null) {
    return token[n];
  }
  const bearer = await refreshToken();
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

const makeRequest = async (url) => {
  const axiosConfig = await getHeader();

  // Call paginated API and return number of requests needed.
  const getQueryCount = await api.get(url, axiosConfig).catch((error) => {
    throw error;
  });
  const totalItems = parseInt(getQueryCount.data['@attributes'].count);
  const queriesNeeded = Math.ceil(totalItems / 100);

  // Loop through paginated API and push data to dataToReturn
  const dataToReturn = [];

  for (let i = 0; i < queriesNeeded; i++) {
    try {
      const res = await api.get(`${url}&offset=${i * 100}`, axiosConfig);
      const { data } = res;
      const arrayName = Object.keys(data)[1];
      const selectedData = await data[arrayName];
      if (selectedData instanceof Array) {
        selectedData.map((item) => {
          dataToReturn.push(item);
        });
      } else dataToReturn.push(selectedData);

      if (i + 1 === queriesNeeded) {
        return dataToReturn;
      }
    } catch (error) {
      console.error(error);
    }
  }

  // const data = await api.get(url, axiosConfig).catch((err) => console.error(err.response.data));
  // return data;
};

export async function getItems() {
  const items = makeRequest(
    `Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemECommerce.listOnStore=true&orderby=description`
  );
  return items;
}

export async function getItem(itemID) {
  const item = makeRequest(`Item/${itemID}.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &ItemECommerce.listOnStore=true`);
  return item;
}

export async function getItemsByCategory(categoryID) {
  const itemsByCategory = makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &ItemECommerce.listOnStore=true&categoryID=${categoryID}&orderby=description`);
  return itemsByCategory;
}

export async function getAmmo() {
  const ammo = makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &Category.categoryID=IN,[23,35,46,59,62,71,82,116,143,197,218,233,239,241,268,269,282,287,297]&ItemECommerce.listOnStore=true&orderby=description`);
  return ammo;
}

export async function getReloading() {
  const ammo = makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &Category.categoryID=IN,[156,38,190,120,180,12,50,108,74,10,159,154,185,238]&ItemECommerce.listOnStore=true&orderby=description`);
  return ammo;
}

export async function getAccessories() {
  const accessories = makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &Category.categoryID=IN,[2,21,48,68,77,78,93,95,97,102,119,134,144,146,148,149,153,161,163,173,175,177,189,205,213,216,220,221,230,231,262,286,290,294,298,170,215,270,265,261,284,70,291,132, 127,253,242,209,240,186,191,188,158,184,187,243,244,139,222,296,254,24,107,61,79,45,115,263,90,292,168,117,76,166,208,88,141,212,56,18,47,289,103,104,201,234,232,75,33,236,126,181,85,182,69,285,145,207]&ItemECommerce.listOnStore=true&orderby=description`);
  return accessories;
}

// export async function getMatrixAccessories() {
//   const accessories = makeRequest(`ItemMatrix.json?load_relations=["Category", "Images", "ItemECommerce"]
//   &Category.categoryID=IN,[273, 276, 275, 272, 279, 278, 274, 280, 281, 277, 90, 122, 154, 88, 47, 48, 18, 77, 153, 73, 2, 262, 163, 21, 78, 261, 24, 263, 76, 166, 212, 56, 59, 42, 103, 104, 236, 66, 145, 207]&ItemECommerce.listOnStore=true&orderby=description`);
//   return accessories;
// }

export async function getOptics() {
  const optics = makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &Category.categoryID=IN,[39, 109, 91, 105, 267, 4, 36, 27, 37, 80, 29, 16, 150, 266, 259]&ItemECommerce.listOnStore=true&orderby=description`);
  return optics;
}

export async function getSecurity() {
  const security = makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &Category.categoryID=IN,[206,124,131,225]&ItemECommerce.listOnStore=true&orderby=description`);
  return security;
}

export async function getMaintenance() {
  const maintenance = makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &Category.categoryID=IN,[164, 52, 106, 86, 57, 14, 58, 65, 96, 83, 245, 165]&ItemECommerce.listOnStore=true&orderby=description`);
  return maintenance;
}

export async function getClothing() {
  const clothing = makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &Category.categoryID=IN,[5, 237, 202, 49, 15, 137, 235, 140, 43, 6, 179, 155, 214, 100, 162, 228, 8, 121, 51, 200, 147, 7, 151]&ItemECommerce.listOnStore=true&orderby=description`);
  return clothing;
}

export async function getMatrixClothing() {
  const matrixClothing = makeRequest(`ItemMatrix.json?load_relations=["Category", "Images", "ItemECommerce"]
  &Category.categoryID=IN,[5, 237, 202, 49, 15, 137, 235, 140, 43, 6, 179, 155, 214, 100, 162, 228, 8, 121, 51, 200, 147, 7, 151, 110, 111, 217, 210]&ItemECommerce.listOnStore=true&orderby=description`);
  return matrixClothing;
}

export async function getMatrixClothingItem(itemID) {
  const matrixClothingItem = makeRequest(
    `ItemMatrix/${itemID}.json?load_relations=["Category", "Images", "ItemECommerce"]&ItemECommerce.listOnStore=true`
  );
  return matrixClothingItem;
}

export async function getCategory(categoryID) {
  const category = await makeRequest(`Category.json?categoryID=IN,${categoryID}&orderby=name`);
  return category;
}

export async function getCategories() {
  const categories = makeRequest(`Category.json?orderby=name`);
  return categories;
}

export async function getManufacturers(manufacturerID) {
  const manufacturers = makeRequest(`Manufacturer.json?manufacturerID=IN,${manufacturerID}&orderby=name`);
  return manufacturers;
}

export async function getTippmann() {
  const tippmann = makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &manufacturerID=21&ItemECommerce.listOnStore=true&orderby=description`);
  return tippmann;
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
