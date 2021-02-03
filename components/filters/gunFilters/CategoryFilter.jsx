const CategoryFilter = (props) => {
  const { categories, handleCategoryChange, selectedCategory } = props

  return (
    <>
      {categories.map(cat => {
        return (
          <div className="hover:text-ssorange" key={cat.categories.catID}>
            <input type="checkbox" id={cat.categories.name} value={cat.categories.name} checked={selectedCategory[cat.category]} onChange={handleCategoryChange} className="hover:ssorange" />
            <label key={cat.categories.name} htmlFor={cat.categories.name} className="ml-1 uppercase">{cat.categories.name}</label>
          </div>
        )
      })}
    </>
  )
}

export default CategoryFilter