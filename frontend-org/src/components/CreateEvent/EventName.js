import React from 'react'

const EventName = () => {
  return (
    <><label className='EventLabelName' htmlFor='eventName'>Event Name</label>
        <form className='EventName'>

          <input
              autoFocus
              id='eventName'
              type='text'
              placeholder='Event Name'
              required />
        </form></>
  )
}

export default EventName