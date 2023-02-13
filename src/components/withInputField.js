import React, { useState, useEffect} from 'react';

function withInputField(WrappedComponent) {
  return function (props) {
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

    return (
      <WrappedComponent {...props} tableList={tableList} setTableList={setTableList} editNumber={editNumber} setEditNumber={setEditNumber}  editIndex={editIndex}  setEditIndex={setEditIndex} dividedNumberList={dividedNumberList}  setDividedNumberList={setDividedNumberList} divideByNumber={divideByNumber} setDivideByNumber={setDivideByNumber} errorMessage={errorMessage} setErrorMessage={setErrorMessage} updateInList={updateInList} deleteFromList={deleteFromList} addInList={addInList} deleteFromDivisionListList={deleteFromDivisionListList} setNumberHandler={setNumberHandler} setDivideByNumberHandler={setDivideByNumberHandler} setEditNumberHandler={setEditNumberHandler} showErrorMessage={showErrorMessage} number={number} setNumber={setNumber}/>
    );
  };
}

export default withInputField