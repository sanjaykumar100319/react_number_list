import React from 'react'
const InputField = (props) =>{

  function showErrorMessage(key){
    const getErrorMessage = props.errorMessage.find((obj => obj.key === key))
    if (getErrorMessage){
      return <p style={{color: "red"}}>{getErrorMessage.error}</p>
    }
  }

  return(
  <div>
    <label className="p-2">
      <p>Enter a table number:</p>
      { props.editNumber ? <input type="text" value={props.editNumber} onChange={(e) => props.setEditNumberHandler(e.target.value)} className="form-control" required ref={props.inputRef}></input> : <input type="text" value={props.number} onChange={props.setNumberHandler} className="form-control" required autoFocus ref={props.inputRef}></input>}
      
      { showErrorMessage("tableNumber") }
    </label>

    { props.editNumber ? <button type="submit" onClick={() => props.updateInList(props.editIndex)} className="btn btn-primary btn-sm ml-2">Update</button> : <button type="submit" onClick={() => props.addInList()} className="btn btn-primary btn-sm ml-2">Save</button> }
    <div className='mt-3 division-sty'>
      <label>
        <p>Division by:</p>
        <input type="text" value={props.divideByNumber} onChange={props.setDivideByNumberHandler} className="form-control" required></input>
        { showErrorMessage("divideByNumber") }
      </label>
    </div>
  </div>
  )
}
export default InputField;