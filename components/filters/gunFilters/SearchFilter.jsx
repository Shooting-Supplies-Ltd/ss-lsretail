import { useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';

const SearchFilter = ({ guns, setFilteredGuns }) => {
  const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
    if (searchQuery && searchQuery.length > 2) {
      const searchResult = guns.filter((gun) => {
        if (
          gun.Make.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gun.Model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gun.Variant?.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return gun;
        }
      });
      setFilteredGuns(searchResult);
    } else {
      setFilteredGuns(null);
    }
  }, [searchQuery, guns, setFilteredGuns]);

  return (
    <div className="flex justify-center">
       <div className="relative left-2/4">
      <MdSearch className="relative top-2.5 right-16 text-2xl text-ssblue" />
      </div>
      <input
        type="text"
        name="search"
        id="search"
        autoComplete="off"
        className="p-2 w-full border-t border-b border-ssblue placeholder-ssblue font-semibold"
        style={{ textAlign: 'center' }}
        placeholder="Search Here"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
