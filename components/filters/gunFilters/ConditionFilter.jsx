const ConditionFilter = (props) => {
  const { conditions, handleConditionChange, selectedCondition } = props

  return (
    <>
      {conditions.map(condition => {
        return (
          <div className="hover:text-ssorange">
            <input type="checkbox" id={condition.condition.name} value={condition.condition.name} checked={selectedCondition[condition.condition]} onChange={handleConditionChange} className="hover:ssorange" />
            <label key={condition.condition.name} htmlFor={condition.condition.name} className="ml-2 uppercase">{condition.condition.name}</label>
          </div>
        )
      })}
    </>
  )
}

export default ConditionFilter