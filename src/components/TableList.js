import React from 'react'
const TableList = ({index, number, setEditIndexHandler, deleteFromList, inputRef}) =>{
  return(
    <tr className="list-group-item">
      <td>{number}</td>
      <td><button onClick={() => setEditIndexHandler(index, number, inputRef)} className="btn btn-primary btn-sm">Edit</button> </td>
      {<td><button onClick={() => deleteFromList(index)} className="btn btn-primary btn-sm">Delete</button></td>}
    </tr>
  )
}
export default TableList;