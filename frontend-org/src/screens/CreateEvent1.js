import React from 'react'
import EventName from '../CreateEventComponents/EventName'
import ShortDescription from '../CreateEventComponents/ShortDescription'
import EventTag from '../CreateEventComponents/EventTag'
import CoverImage from '../CreateEventComponents/CoverImage'

const CreateEvent1 = () => {
  const saveData = () => {
    sessionStorage.setItem("event_name", document.getElementById("eventName").value);
    sessionStorage.setItem("event_tags", document.getElementById("eventTag").value);
  }
  return (
    <><div style={{ marginTop: "40px", paddingLeft: "3.5rem" }}>
      <h2>Create New Event (1/3)</h2>
    </div>
    <div className='CreateEvent1'>
        <EventName />
        <br />
        <CoverImage />
        <br />
        <EventTag />
        <br />
        <br />
        <br />
        <a href='/create/2'>
          <button className='Create1Button' onClick={saveData}>
            Next
          </button>
        </a>


      </div></>
  )
}

export default CreateEvent1