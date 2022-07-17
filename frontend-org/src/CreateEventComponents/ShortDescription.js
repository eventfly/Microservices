import React from 'react'

const ShortDescription = () => {
  return (
    <div className={"Short-des"}>
      <label htmlFor={"description"}>Event Description</label>
      <br></br><br></br>
      <textarea 
      type={"text"} 
      style={{ height: "300px", fontSize: "1rem"}} 
      className={"form-control"} id={"description"} 
      placeholder="Event Description">
      </textarea>
  </div>
  )
}

export default ShortDescription