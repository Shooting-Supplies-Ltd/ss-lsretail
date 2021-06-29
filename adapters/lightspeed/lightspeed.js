import makeRequest from "./makeRequest";

export async function getItems() {
  const items = makeRequest(
    `Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce", "CustomFieldValues"]&CustomFieldValues.customFieldID=7&orderby=description`
  );
  return items;
}

export async function getItem(itemID) {
  const item = makeRequest(
    `Item/${itemID}.json?load_relations=["Category", "Images", "ItemShops", "ItemPrices", "ItemECommerce", "Manufacturer", "CustomFieldValues"]`
  );
  return item;
}

export async function getItemsByCategory(categoryID) {
  const itemsByCategory =
    makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce", "CustomFieldValues"]
  &CustomFieldValues.customFieldID=7&categoryID=${categoryID}&orderby=description`);
  return itemsByCategory;
}

export async function getAmmo() {
  const ammo =
    makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce", "CustomFieldValues"]
  &Category.categoryID=IN,[23,35,46,59,62,71,82,116,143,197,218,233,239,241,268,269,282,287,297]&CustomFieldValues.customFieldID=7&orderby=description`);
  return ammo;
}

export async function getReloading() {
  const reloading =
    makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce", "CustomFieldValues"]
  &Category.categoryID=IN,[156,38,190,120,180,12,50,108,74,10,159,154,185,238]&CustomFieldValues.customFieldID=7&orderby=description`);
  return reloading;
}

export async function getAccessories() {
  const accessories =
    makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce", "CustomFieldValues"]
  &Category.categoryID=IN,[146, 77, 153, 95, 290, 119, 2, 298, 177, 262, 163, 48, 149, 102, 294, 21, 148, 78, 213, 189, 175, 97, 173, 216, 93, 286, 134, 231, 161, 205, 221, 220, 68, 144, 230, 170, 215, 270, 265, 261, 284, 70, 291, 132, 127, 253, 242, 209, 240, 186, 191, 188, 158, 184, 187, 243, 244, 139, 222, 296, 254, 24, 107, 61, 79, 45, 115, 263, 90, 292, 168, 117, 76, 166, 208, 88, 141, 212, 299, 56, 18, 47, 289, 103, 104, 201, 234, 232, 75, 33, 236, 126, 181, 85, 182, 69, 285, 145, 207, 204, 192, 174, 172]&CustomFieldValues.customFieldID=7&orderby=description`);
  return accessories;
}

export async function getOptics() {
  const optics =
    makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce", "CustomFieldValues"]
  &Category.categoryID=IN,[295, 39, 109, 91, 105, 267, 4, 36, 27, 37, 80, 29, 150, 266, 259]&CustomFieldValues.customFieldID=7&orderby=description`);
  return optics;
}

export async function getSecurity() {
  const security =
    makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce", "CustomFieldValues"]
  &Category.categoryID=IN,[206,124,131,225]&CustomFieldValues.customFieldID=7&orderby=description`);
  return security;
}

export async function getMaintenance() {
  const maintenance =
    makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce", "CustomFieldValues"]
  &Category.categoryID=IN,[164, 52, 106, 86, 57, 14, 58, 65, 96, 83, 245, 165]&CustomFieldValues.customFieldID=7&orderby=description`);
  return maintenance;
}

export async function getClothing() {
  const clothing =
    makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce", "CustomFieldValues"]
  &Category.categoryID=IN,[5, 237, 202, 49, 15, 137, 235, 140, 43, 6, 179, 155, 214, 100, 162, 228, 8, 121, 51, 200, 147, 7, 151]&CustomFieldValues.customFieldID=7&orderby=description`);
  return clothing;
}

export async function getMatrixClothing() {
  const matrixClothing =
    makeRequest(`ItemMatrix.json?load_relations=["Category", "Images", "ItemECommerce"]
  &Category.categoryID=IN,[5, 237, 202, 49, 15, 137, 235, 140, 43, 6, 179, 155, 214, 100, 162, 228, 8, 121, 51, 200, 147, 7, 151, 110, 111, 217, 210]&CustomFieldValues.customFieldID=7&orderby=description`);
  return matrixClothing;
}

export async function getMatrixClothingItem(itemID) {
  const matrixClothingItem = makeRequest(
    `ItemMatrix/${itemID}.json?load_relations=["Category", "Images", "ItemECommerce"]&CustomFieldValues.customFieldID=7`
  );
  return matrixClothingItem;
}

export async function getCategory(categoryID) {
  const category = await makeRequest(
    `Category.json?categoryID=IN,${categoryID}&orderby=name`
  );
  return category;
}

export async function getCategories() {
  const categories = makeRequest(`Category.json?orderby=name`);
  return categories;
}

export async function getManufacturer(manufacturerID) {
  const manufacturers = makeRequest(
    `Manufacturer.json?manufacturerID=IN,${manufacturerID}&orderby=name`
  );
  return manufacturers;
}

export async function getManufacturers() {
  const manufacturers = makeRequest(`Manufacturer.json?orderby=name`);
  return manufacturers;
}

export async function getTippmann() {
  const tippmann =
    makeRequest(`Item.json?load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]
  &manufacturerID=21&CustomFieldValues.customFieldID=7&orderby=description`);
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
