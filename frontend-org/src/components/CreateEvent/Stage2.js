// import {Link} from 'react-router-dom'
import "../../styles/CreateEvent.css"

import Map from './Map';
import ShortDescription from './ShortDescription';
import TicketPrice from './TicketPrice';
import Date from './Date';
import PrivacyType from './PrivacyType';
import EmailFilter from './EmailFilter';


const CreateEventStage2 = ({backStage, nextStage}) => {
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

                    <button className='Create2Button' onClick={backStage}>
                        Back
                    </button>

                    <button className='Create2Button' onClick={nextStage}>
                        Next
                    </button>

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

    );
}
 
export default CreateEventStage2;