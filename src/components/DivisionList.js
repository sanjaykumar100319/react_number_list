import React from 'react'
const DivisionList = (props) =>{
  return(
    <tr className="list-group-item">
      <td>{ props.number}</td>
      <td>{<button onClick={() => props.deleteFromDivisionListList(props.index)} className="btn btn-primary btn-sm">Delete</button>}</td>
    </tr>
  )
}
export default DivisionList;