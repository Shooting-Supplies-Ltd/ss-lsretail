import { useState, useEffect } from 'react'

const SearchFilter = ({ guns }) => {
  const [searchQuery, setSearchQuery] = useState()

  const searchProducts = () => {
    console.log('filter')
  }

  useEffect(() => {
    console.log(searchQuery)
  }, [searchQuery])

  return (
    <form className="flex justify-center" onSubmit={searchProducts}>
      <input type="text" name="search" id="search" className="p-2 w-full border-t border-b border-ssblue" style={{ textAlign: 'center' }} placeholder="Search Guns" onChange={e => setSearchQuery(e.target.value)} />
      <input type="submit" className="hidden" />
    </form>
  )
}

export default SearchFilter