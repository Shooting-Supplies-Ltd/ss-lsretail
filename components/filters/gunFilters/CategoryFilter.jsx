const CategoryFilter = (props) => {
  const { categories, handleCategoryChange, selectedCategory } = props;

  return (
    <>
      {categories.map((cat) => (
        <li
          className="hover:text-ssorange mb-2 md:mb-0"
          key={cat.categories.name}
        >
          <input
            type="checkbox"
            id={cat.categories.name}
            value={cat.categories.name}
            checked={selectedCategory[cat.categories.name]}
            onChange={handleCategoryChange}
            className="hover:ssorange"
          />
          <label
            key={cat.categories.name}
            htmlFor={cat.categories.name}
            className="ml-1 uppercase"
          >
            {cat.categories.name}
          </label>
        </li>
      ))}
    </>
  );
};

export default CategoryFilter;
