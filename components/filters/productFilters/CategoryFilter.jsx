const CategoryFilter = ({
  categories,
  handleCategoryChange,
  selectedCategory,
}) => (
  <>
    {categories.map((cat) => (
      <li className="hover:text-ssorange mb-2 md:mb-0" key={cat.catID}>
        <input
          type="checkbox"
          id={cat.name}
          value={cat.catID}
          checked={selectedCategory[cat.catID]}
          onChange={handleCategoryChange}
          className="hover:ssorange"
        />
        <label
          key={cat.name}
          htmlFor={cat.name}
          className="ml-2 text-lg lg:text-base uppercase"
        >
          {cat.name}
        </label>
      </li>
    ))}
  </>
);

export default CategoryFilter;
