import React from 'react'

const PromoteEvent = () => {
  return (
    <div className={"Promote"}>
        <label htmlFor={"promotion"}>Promote Event?</label>
        <br></br><br></br>
        <select 
            id={"promotion"} 
            className={"form-control"}
            style={{height: '50px'}}
        >
            <option defaultValue={"yes"}>Yes</option>
            <option>No</option>
        </select>
    </div>
  )
}

export default PromoteEvent