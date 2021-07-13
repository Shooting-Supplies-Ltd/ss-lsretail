export function parseCategories(items) {
  const categoryList = items.map((item) => ({
    catID: item.Category.categoryID,
    name: item.Category.name,
  }));

  const categories = Array.from(new Set(categoryList.map((cat) => cat.catID)))
    .map((id) => {
      return categoryList.find((cat) => cat.catID === id);
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return categories;
}

export function parseBrands(items) {
  const brandsList = items.map((item) => ({
    brandID: item.Manufacturer.manufacturerID,
    name: item.Manufacturer.name,
  }));

  const brands = Array.from(new Set(brandsList.map((brand) => brand.brandID)))
    .map((id) => {
      return brandsList.find((brand) => brand.brandID === id);
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return brands;
}

export const getSingleProductFromMatrix = (id) => {
  const result = item.Items.Item.filter((obj) => obj.itemID == id);

  return {
    name: result[0].description,
    description: result[0].ItemECommerce
      ? result[0].ItemECommerce.longDescription
      : "",
    shortDescription: result[0].ItemECommerce
      ? result[0].ItemECommerce.shortDescription
      : "",
    sku: result[0].customSku,
    price: result[0].Prices.ItemPrice[0].amount.replace(".", ""),
    currency: "GBP",
    image:
      image ||
      `${item.Images.Image.baseImageURL}/w_300/${item.Images.Image.publicID}.jpg`,
    itemID: result[0].itemID,
    unitPrice: result[0].Prices.ItemPrice[0].amount,
  };
};
