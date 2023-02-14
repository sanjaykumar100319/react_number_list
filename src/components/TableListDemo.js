import React,{ useState, useEffect } from 'react'
import InputField from './InputField'

function TableListDemo() {
  const [tableList, setTableList ] = useState([])
  const [number, setNumber ] = useState('')
  const [editNumber, setEditNumber ] = useState('')
  const [editIndex, setEditIndex ] = useState(false)
  const [dividedNumberList, setDividedNumberList ] = useState([])
  const [divideByNumber, setDivideByNumber ] = useState('')
  const [errorMessage, setErrorMessage] = useState([])

  const addInList = () =>{
    validate(number, 'tableNumber') && setTableList([...tableList, parseInt(number) + (tableList[tableList.length - 1] || 0)])
  }

  function updateInList(index) {
    const newArray = [...tableList]

    if (editNumber && validate(editNumber, "editNumber") || true){
      newArray[editIndex] = isNaN(parseInt(editNumber))? newArray[index] : parseInt(editNumber)
      setTableList(newArray)
      setEditIndex(false)
      setEditNumber('')
    }
  }

  const deleteFromList = (index) => {
    const newArray = [...tableList]
    newArray.splice(index, 1)
    setTableList(newArray)
  }
  
  useEffect(() =>{
    const divideBy = parseInt(divideByNumber)
    setDividedNumberList(tableList.filter(n => n % divideBy == 0).map(num => {
      if (num % divideBy == 0)
        {
          return num
        }
    }))
  }, [divideByNumber, tableList])
  
  const deleteFromDivisionListList = (index) => {
    const divisionArray = [...dividedNumberList]
    divisionArray.splice(index, 1)
    setDividedNumberList(divisionArray)
  }
  
  const setNumberHandler = (e) => {
    let number = e.target.value
    validate(number, 'tableNumber')
    setNumber(number)
  }

  const setDivideByNumberHandler = (e) => {
    let number = e.target.value
    validate(number, "divideByNumber")
    setDivideByNumber(number)
  }

  const setEditNumberHandler = (e) => {
    let editedNumber = e.target.value
    validate(editedNumber, "editNumber")
    setEditNumber(editedNumber)
  }

  function validate(number, key){
    const inputValid = /^\d+$/.test(number)
    if (!inputValid) {
      setErrorMessage([...errorMessage, { key: key, error: "Invalid number!" }])
      return false
    }
    else{
      const getErrorMessage = errorMessage.find((obj => obj.key === key))
      console.log(errorMessage.filter(obj => obj.key !== key))
      setErrorMessage(prevErrorMessage => prevErrorMessage.filter(obj => obj.key !== key))
      return true
    }
  }

  function showErrorMessage(key){
    const getErrorMessage = errorMessage.find((obj => obj.key === key))
    if (getErrorMessage){
      return <p style={{color: "red"}}>{getErrorMessage.error}</p>
    }
  }
  function setEditIndexHandler(index){
    setEditNumber('')
    setEditIndex(index)
  }
  return (
    <React.Fragment>
      <div className="container text-center mt-5">
        <div className="row">
          <div className="col">
            <InputField number={number} setNumberHandler={setNumberHandler} showErrorMessage={showErrorMessage} addInList={addInList} divideByNumber={divideByNumber} setDivideByNumberHandler={setDivideByNumberHandler} />
          </div>
          <div className="col">
            <p>Table List</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
                <tbody>
                  { tableList.map((number,index) => 
                    <tr key={index} className="list-group-item">
                      { (editIndex !== index) ?<td>{number}</td> : <td><input type="text" value={editNumber || number} onChange={setEditNumberHandler} className="form-control" required></input></td>}
                      { (editIndex === index) && showErrorMessage("editNumber") }
                      {(editIndex !== index) ? <td><button onClick={() => setEditIndexHandler(index)} className="btn btn-primary btn-sm">Edit</button> </td> : <td><button onClick={() => updateInList(index)}className="btn btn-primary btn-sm">Upadte</button></td> }

                      {<td><button onClick={() => deleteFromList(index)} className="btn btn-primary btn-sm">Delete</button></td>}
                    </tr>
                  )}
                </tbody>
            </table>
          </div>
          <div className="col">

            <p>Division List</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
                <tbody>
                  { dividedNumberList.map((number,index) => 
                    <tr key={index} className="list-group-item">
                      <td>{ number}</td>
                      <td>{<button onClick={() => deleteFromDivisionListList(index)} className="btn btn-primary btn-sm">Delete</button>}</td>
                    </tr>
                  )}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TableListDemo;