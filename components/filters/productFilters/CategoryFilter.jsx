const CategoryFilter = ({ categories, handleCategoryChange, selectedCategory }) => (
  <>
    {categories.map((cat) => (
      <div className="hover:text-ssorange mb-2 md:mb-0" key={cat.catID}>
        <input
          type="checkbox"
          id={cat.name}
          value={cat.catID}
          checked={selectedCategory[cat.name]}
          onChange={handleCategoryChange}
          className="hover:ssorange"
        />
        <label key={cat.name} htmlFor={cat.name} className="ml-1 uppercase">
          {cat.name}
        </label>
      </div>
    ))}
  </>
);

export default CategoryFilter;
