import { useState, useEffect } from 'react';

const SearchFilter = ({ items, setFilteredItems }) => {
  const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
    if (searchQuery && searchQuery.length > 2) {
      const searchResult = items.filter((item) => {
        if (
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.ItemECommerce?.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return item;
        }
      });
      setFilteredItems(searchResult);
    } else {
      setFilteredItems(null);
    }
  }, [searchQuery]);

  return (
    <div className="flex justify-center">
      <input
        type="text"
        name="search"
        id="search"
        autoComplete="off"
        className="p-2 w-full border-t border-b border-ssblue"
        style={{ textAlign: 'center' }}
        placeholder="Search Here"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
