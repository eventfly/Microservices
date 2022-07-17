import React from 'react'

const EmailFilter = () => {
  return (
    <div className={"EmailFilter"}>
        <label htmlFor={"email_filter"}>Email Filter</label>
        <br></br><br></br>
        <input 
            type='text'
            className={"form-control"} 
            id={"email_filter"} 
            placeholder="@gmail.com"
            style={{height: '50px'}}
        >
        </input>
    </div>
  )
}

export default EmailFilter