import React from 'react'
const InputField = (props) =>{
  return(
  <div>
    <label>
      <p>Enter a table number:</p>
      <input type="text" value={props.number} onChange={props.setNumberHandler} className="form-control" required ></input>
      { props.showErrorMessage("tableNumber") }
    </label>

    <button type="submit" onClick={() => props.addInList()} className="btn btn-primary btn-sm ml-2">Save</button>
    <div className='mt-5'>
      <label>
        <p>Division by:</p>
        <input type="text" value={props.divideByNumber} onChange={props.setDivideByNumberHandler} className="form-control" required></input>
        { props.showErrorMessage("divideByNumber") }
      </label>
    </div>
  </div>
  )
}
export default InputField;