const CategoryFilter = ({ categories, handleCategoryChange, selectedCategory }) => {
  return (
    <>
      {categories.map(cat => {
        return (
          <div className="hover:text-ssorange" key={cat.category.catID}>
            <input type="checkbox" id={cat.category.name} value={cat.category.catID} checked={selectedCategory[cat.category.name]} onChange={handleCategoryChange} className="hover:ssorange" />
            <label key={cat.category.name} htmlFor={cat.category.name} className="ml-1 uppercase">{cat.category.name}</label>
          </div>
        )
      })}
    </>
  )
}

export default CategoryFilter