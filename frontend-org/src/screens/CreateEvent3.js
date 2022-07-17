import React from 'react'
import PromoteEvent from '../CreateEventComponents/PromoteEvent'
import MailingList from '../CreateEventComponents/MailingList'

const CreateEvent3 = () => {
    const saveData = () => {
        sessionStorage.setItem("event_promotion", document.getElementById("promotion").value);
        sessionStorage.setItem("event_maillist", document.getElementById("mailing_list").value);
    }
  return (
    <>
        <div style={{ marginTop: "40px", paddingLeft: "3.5rem" }}>
            <h2>Create New Event (3/3)</h2>
        </div>
        <div className='CreateEvent3'>
            <div className='Col-2'>
                <PromoteEvent />
            </div>
            <div className='Col-2'>
                <MailingList />
                <br></br><br></br>
                <br></br><br></br>
            </div>

            <div className='Create3ButtonClass'>
                <a href='/create/2'>
                    <button className='Create3Button' onClick={saveData}>
                        Back
                    </button>
                </a> 

                <a href='/'>
                    <button className='Create3Button' onClick={saveData}>
                        Create Event
                    </button>
                </a>

            </div>
        
            
          
            
        
      </div>

    </>
  )
}

export default CreateEvent3