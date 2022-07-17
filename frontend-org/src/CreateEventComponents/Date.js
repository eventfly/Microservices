import React from 'react'

const Date = () => {
    return (
        <div className='Date'>
            <div >
                <label htmlFor={"start_date"}>Start Date</label>
                <br></br><br></br>
                <input 
                    type='datetime-local' 
                    className={"form-control"} 
                    name={"start_date"} 
                    id={"start_date"}
                    style={{height: '50px'}}
                />
            </div>
            <br />
            <br />
            <div >
                <label htmlFor={"end_date"}>End Date</label>
                <br></br><br></br>
                <input 
                    type='datetime-local' 
                    className={"form-control"} 
                    name={"end_date"}
                    id={"end_date"}
                    style={{height: '50px'}}
                />
            </div>
        </div>
    )
}

export default Date