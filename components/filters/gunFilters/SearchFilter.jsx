import { useState, useEffect } from 'react'

const SearchFilter = ({ guns, setFilteredGuns }) => {
  const [searchQuery, setSearchQuery] = useState()

  useEffect(() => {
    if (searchQuery && searchQuery.length > 2) {
      console.log(searchQuery)
      const searchResult = guns.filter(gun => {
        if (gun.Make.toLowerCase().includes(searchQuery.toLowerCase()) || gun.Model?.toLowerCase().includes(searchQuery.toLowerCase()) || gun.Variant?.toLowerCase().includes(searchQuery.toLowerCase())) {
          return gun
        }
      })
      console.log(searchResult)
      setFilteredGuns(searchResult)
    } else {
      setFilteredGuns(null)
    }
  }, [searchQuery])

  return (
    <div className="flex justify-center">
      <input type="text" name="search" id="search" className="p-2 w-full border-t border-b border-ssblue" style={{ textAlign: 'center' }} placeholder="Search Guns" onChange={e => setSearchQuery(e.target.value)} />
      {/* <input type="submit" className="hidden" /> */}
    </div>
  )
}

export default SearchFilter