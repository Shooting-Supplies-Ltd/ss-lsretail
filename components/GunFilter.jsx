const GunFilter = (props) => {
  const { categories, handleInputChange, checkedInputs } = props

  return (
    <div className="text-black my-24">
      <h4 className="p-2 border-b-2 border-r-2 font-bold">Filter By</h4>
      <div className="p-2 border-r-2">
        <h5 className="mb-2">Category</h5>
        {categories.map(cat => {
          console.log(cat)
          return (
            <div>
              <input type="checkbox" id={cat.id} value={cat.id} checked={checkedInputs[cat.name]} onChange={handleInputChange} />
              <label key={cat.id} className="ml-2" htmlFor={cat.id}>{cat.name}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GunFilter