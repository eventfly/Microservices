import React from 'react'

const MailingList = () => {
  return (
    <div className={"MailingList"}>
        <label htmlFor={"mailing_list"}>Mailing List</label>
        <br></br><br></br>
        <textarea 
            type={"text"} 
            style={{ height: "150px" , fontSize: "1rem"}} 
            className={"form-control"} 
            id={"mailing_list"} 
            placeholder="Mailing List">
        </textarea>
    </div>
  )
}

export default MailingList