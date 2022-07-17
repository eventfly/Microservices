import React from 'react'

const EventTag = () => {
  return (
    <><label className='EventLabelTag' htmlFor='eventTag'>Event Tags</label>
        <form className='EventTag'>

          <input
              autoFocus
              id='eventTag'
              type='text'
              placeholder='Event Tag'
              required />
        </form></>
  )
}

export default EventTag