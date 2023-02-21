import React,{ useState, useRef } from 'react'
import DivisionList from './DivisionList'
import InputField from './InputField'
import TableList from './TableList'

function TableListDemo() {
  const [tableList, setTableList ] = useState([])
  const [number, setNumber ] = useState('')
  const [editNumber, setEditNumber ] = useState('')
  const [editIndex, setEditIndex ] = useState(false)
  const [dividedNumberList, setDividedNumberList ] = useState([])
  const [divideByNumber, setDivideByNumber ] = useState('')
  const [errorMessage, setErrorMessage] = useState([])
  const inputRef = useRef(null);

  const addInList = () =>{
    const newNumber = parseInt(number) + (tableList[tableList.length - 1] || 0)
    validate(number, 'tableNumber') && setTableList([...tableList, newNumber])

    if ((divideByNumber) && (newNumber) % divideByNumber == 0){
      let divideListNum = (newNumber) % divideByNumber == 0 && newNumber
      setDividedNumberList(prevNumberList => [...prevNumberList, divideListNum])
    }
  }

  function updateInList(index) {
    const newArray = [...tableList]

    if (editNumber && validate(editNumber, "editNumber") || true){
      newArray[editIndex] = isNaN(parseInt(editNumber))? newArray[index] : parseInt(editNumber)
      setTableList(newArray)
      if ((newArray[editIndex]) % divideByNumber == 0 ) {
        setDividedNumberList(prevNumberList => [...prevNumberList, newArray[editIndex]])
      }
      setEditIndex(false)
      setEditNumber('')
    }
  }

  const deleteFromList = (index) => {
    const newArray = [...tableList]
    newArray.splice(index, 1)
    setTableList(newArray)
  }
  
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

  const setEditNumberHandler = (num) => {
    validate(num, "editNumber")
    setEditNumber(num)
  }

  function validate(number, key){
    const inputValid = /^\d+$/.test(number)
    if (!inputValid) {
      setErrorMessage([...errorMessage, { key: key, error: "Invalid number!" }])
      return false
    }
    else{
      setErrorMessage(prevErrorMessage => prevErrorMessage.filter(obj => obj.key !== key))
      return true
    }
  }

  function setEditIndexHandler(index, num, inputRef){
    setEditIndex(index)
    setEditNumberHandler(num)
    inputRef.current.focus()
  }
  return (
    <React.Fragment>
      <div className="container text-center mt-5">
        <div className="row">
          <div className="col">
            <InputField number={number} setNumberHandler={setNumberHandler} addInList={addInList} divideByNumber={divideByNumber} setDivideByNumberHandler={setDivideByNumberHandler} editNumber={editNumber} updateInList={updateInList} editIndex={editIndex} setEditNumberHandler={setEditNumberHandler} errorMessage={errorMessage} inputRef={inputRef}/>
          </div>
          <div className="col">
            <p>Table List</p>
            <table className="table d-flex align-items-center justify-content-center">
              <tbody>
                { tableList.map((number,index) => 
                  <TableList key={index} index={index} number={number} setEditIndexHandler={setEditIndexHandler} deleteFromList={deleteFromList} inputRef={inputRef}/>
                )}
              </tbody>
            </table>
          </div>
          <div className="col">
            <p>Division List</p>
            <table className="table d-flex align-items-center justify-content-center">
              <tbody>
                { dividedNumberList.map((number,index) => 
                  <DivisionList key={index} index={index} number={number} deleteFromDivisionListList={deleteFromDivisionListList}/>
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