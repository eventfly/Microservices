// import {Link} from 'react-router-dom'
import "../../styles/CreateEvent.css"

import EventName from './EventName'
import EventTag from './EventTag'
import CoverImage from './CoverImage'


const CreateEventStage1 = ({nextStage}) => {
    return ( 

        <>
        
            <div style={{ marginTop: "40px", paddingLeft: "3.5rem" }}>
                <h2>Create New Event (1/3)</h2>
            </div>

            <div className='CreateEvent1'>

                <EventName />
                <br />

                <CoverImage />
                <br />

                <EventTag />

                <br /><br /><br />

                <button className='Create1Button' onClick={nextStage}>
                    Next
                </button>
                
                

            </div>

        </>

    );
}
 
export default CreateEventStage1;