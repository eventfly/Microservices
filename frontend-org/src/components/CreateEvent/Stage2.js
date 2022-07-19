// import {Link} from 'react-router-dom'
// import "../../styles/CreateEvent.css"

import Map from './Map';
import ShortDescription from './ShortDescription';
import TicketPrice from './TicketPrice';
import Date from './Date';
import PrivacyType from './PrivacyType';
import EmailFilter from './EmailFilter';

import FormTextArea from '../Form/FormTextArea';
import FormButton from '../Form/FormButton';
import FormInput from '../Form/FormInput';
import FormSelect from '../Form/FormSelect';
import DatePicker from '../DatePicker';


const CreateEventStage2 = ({desc, setDesc, ticketPrice, setTicketPrice, setType, setPrivacy, 
    filter, setFilter, setStartDate, setEndDate, backStage, nextStage}) => {
    
        const DefaultLocation = { lat: 23.3, lng: 90.4};

    let eventType = [
        {
            'id': 1,
            'name': 'Offline'
        },
        {
            'id': 2,
            'name': 'Online'
        }
    ]

    let eventPrivacy = [
        {
            'id': 1,
            'name': 'Public'
        },
        {
            'id': 2,
            'name': 'Private'
        }
    ]

    return ( 

        <>
        
            <div style={{ marginTop: "40px", paddingLeft: "3.5rem" }}>
                <h2>Create New Event (2/3)</h2>
            </div>

            <div className='CreateEvent2'>
                <div className='left-column'>

                    <Map DefaultLocation={DefaultLocation}/>
                    <br />

                    {/* <ShortDescription /> */}

                    <FormTextArea id="description"
                        label="Event Description"
                        placeholder="Enter description"
                        height={'300px'}
                        bgColor={'#e5e5e5'}
                        value={desc}
                        onChange={setDesc}
                    />

                    {/* <br /><br /><br /> */}

                    
                {/* 
                    <button className='Create2Button' onClick={backStage}>
                        Back
                    </button>

                    <button className='Create2Button' onClick={nextStage}>
                        Next
                    </button>

                    <br /> */}

                </div>

                <div className='right-column'>

                    {/* <TicketPrice /> */}

                    <FormInput id="ticket"
                        inputType="text"
                        label="Ticket Price(BDT)"
                        placeholder="Event Ticket Price"
                        bgColor={'#e5e5e5'}
                        value={ticketPrice}
                        onChange={setTicketPrice}
                    />
                    
                    <br /><br />

                    {/* <Date /> */}


                    <DatePicker label="Start Date" onChange={setStartDate}/>

                    <br /><br />
                    
                    <DatePicker label="End Date" onChange={setEndDate}/>

                    <br /><br />

                    <FormSelect id="type"
                        label="Event Type"
                        bgColor={'#e5e5e5'}
                        options={eventType}
                        onChange={setType}
                    />

                    <br /><br />

                    <FormSelect id="privacy"
                        label="Event Privacy"
                        bgColor={'#e5e5e5'}
                        options={eventPrivacy}
                        onChange={setPrivacy}
                    />

                    {/* <PrivacyType /> */}

                    <br /><br />

                    <FormInput id="filter"
                        inputType="text"
                        label="Email Filter"
                        placeholder="@gmail.com"
                        bgColor={'#e5e5e5'}
                        value={filter}
                        onChange={setFilter}
                    />

                    {/* <EmailFilter /> */}

                </div>
                

                <div className='btn-group'>
                    
                    <div className='left-button'>
                        <FormButton type="button" buttonText="Back" onClick={backStage} />
                    </div>

                    <FormButton type="button" buttonText="Next" onClick={nextStage} />

                </div>

                
            </div>
        
        </>

    );
}
 
export default CreateEventStage2;