import React from 'react'
import Map from '../CreateEventComponents/Map';
import ShortDescription from '../CreateEventComponents/ShortDescription';
import TicketPrice from '../CreateEventComponents/TicketPrice';
import Date from '../CreateEventComponents/Date';
import PrivacyType from '../CreateEventComponents/PrivacyType';
import EmailFilter from '../CreateEventComponents/EmailFilter';


const CreateEvent2 = () => {

    const saveData = () => {
        sessionStorage.setItem("event_desc", document.getElementById("description").value);
        sessionStorage.setItem("event_ticket", document.getElementById("price").value);
        sessionStorage.setItem("event_start", document.getElementById("start_date").value);
        sessionStorage.setItem("event_end", document.getElementById("end_date").value);
        sessionStorage.setItem("event_type", document.getElementById("event_type").value);
        sessionStorage.setItem("event_privacy", document.getElementById("event_privacy").value);
        sessionStorage.setItem("event_filter", document.getElementById("email_filter").value);
    }

    return (
        <>
            <div style={{ marginTop: "40px", paddingLeft: "3.5rem" }}>
                <h2>Create New Event (2/3)</h2>
            </div>
            <div className='CreateEvent2'>
                <div className='Col-1'>
                   <Map />
                    <br />
                    <ShortDescription />
                    <br />
                    <br />
                    <br />

                    <a href='/create/1'>
                    <button className='Create2Button' onClick={saveData}>
                        Back
                    </button>
                    </a>

                    <a href='/create/3'>
                    <button className='Create2Button' onClick={saveData}>
                        Next
                    </button>
                </a>
                <br /> 
                </div>
                <div className='Col-1'>
                    <TicketPrice />
                    <br />
                    <br />
                    <Date />
                    <br />
                    <br />
                    <PrivacyType />
                    <br />
                    <br />
                    <EmailFilter />
                </div>
                
                
            </div>
        </>
    )
}

export default CreateEvent2