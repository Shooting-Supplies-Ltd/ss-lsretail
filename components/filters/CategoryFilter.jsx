const CategoryFilter = (props) => {
  const { categories, handleCategoryChange, selectedCategory } = props

  return (
    <div className="p-2 my-2 border-r-2 border-b-2">
      <h5 className="mb-2 font-semibold uppercase">Category</h5>
      {categories.map(cat => {
        return (
          <div className="hover:text-ssorange my-1">
            <input type="checkbox" id={cat.categories.name} value={cat.categories.name} checked={selectedCategory[cat.categories]} onChange={handleCategoryChange} className="hover:ssorange" />
            <label key={cat.categories.name} className="ml-2" htmlFor={cat.categories.name} className="ml-2">{cat.categories.name}</label>
          </div>
        )
      })}
    </div>
  )
}

export default CategoryFilter