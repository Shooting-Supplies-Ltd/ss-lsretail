export function getCategories(items) {
    const categoryList = items.map((item) => ({
        catID: item.Category.categoryID,
        name: item.Category.name,
      }))

      const categories = Array.from(new Set(categoryList.map(cat => cat.catID))).map(id => {
        return categoryList.find(cat => cat.catID === id)
      }).sort((a,b) => a.name.localeCompare(b.name))

      return categories
}

export function getBrands(items) {
    const brandsList = items.map((item) => ({
        brandID: item.Manufacturer.manufacturerID,
        name: item.Manufacturer.name,
      }));

      const brands = Array.from(new Set(brandsList.map(brand => brand.brandID))).map(id => {
        return brandsList.find(brand => brand.brandID === id)
      }).sort((a,b) => a.name.localeCompare(b.name))

      return brands
}