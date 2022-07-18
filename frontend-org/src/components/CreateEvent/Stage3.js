import { Link } from 'react-router-dom'
// import "../../styles/CreateEvent.css"

import PromoteEvent from './PromoteEvent'
import MailingList from './MailingList'


const CreateEventStage3 = ({ backStage, createEvent }) => {
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
                    <button className='Create3Button' onClick={backStage}>
                        Back
                    </button>

                    <Link to={`/`}>
                        <button className='Create3Button' onClick={() => createEvent()}>
                            Create Event
                        </button>
                    </Link>

                </div>

            </div>

        </>

    );
}

export default CreateEventStage3;