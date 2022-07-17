import React from 'react'

const PrivacyType = () => {
    return (
        <div className='PrivacyType'>
            <div >
            <label htmlFor={"event_type"}>Event Type</label>
            <br></br><br></br>
            <select 
                id={"event_type"} 
                className={"form-control"}
                style={{height: '50px'}}
            >
                    <option defaultValue={"Offline"}>Offline</option>
                    <option>Online</option>
            </select>
        </div>
        <br></br>
        <br></br>
        <div >
            <label htmlFor={"event_privacy"}>Event Privacy</label>
            <br></br><br></br>
            <select 
                id={"event_privacy"} 
                className={"form-control"}
                style={{height: '50px'}}
            >
                    <option defaultValue={"Public"}>Public</option>
                    <option>Private</option>
            </select>
            </div>
        </div>
    )
}

export default PrivacyType