const CategoryFilter = (props) => {
  const { categories, handleCategoryChange, selectedCategory } = props

  return (
    <>
      {categories.map(cat => {
        return (
          <div className="hover:text-ssorange">
            <input type="checkbox" id={cat.categories.name} value={cat.categories.name} checked={selectedCategory[cat.categories]} onChange={handleCategoryChange} className="hover:ssorange" />
            <label key={cat.categories.name} htmlFor={cat.categories.name} className="ml-2 uppercase">{cat.categories.name}</label>
          </div>
        )
      })}
    </>
  )
}

export default CategoryFilter