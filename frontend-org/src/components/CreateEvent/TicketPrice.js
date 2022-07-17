import React from 'react'

const TicketPrice = () => {
  return (
    <div className={"Ticket"}>
        <label htmlFor={"price"}>Ticket Price (BDT)</label>
        <br></br><br></br>
        <input 
            type= 'number' 
            className={"form-control"} 
            id={"price"} 
            placeholder="Event Ticket Price"
            style={{height: '50px'}}
        />
    </div>
  )
}

export default TicketPrice