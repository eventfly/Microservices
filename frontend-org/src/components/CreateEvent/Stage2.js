// import {Link} from 'react-router-dom'

import Map from './Map';

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

            <div className='stage2-content'>

                <div className='CreateEvent2'>
                    <div className='left-column'>

                        <Map DefaultLocation={DefaultLocation}/>
                        <br />

                        <FormTextArea id="description"
                            label="Event Description"
                            placeholder="Enter description"
                            height={'300px'}
                            bgColor={'#e5e5e5'}
                            value={desc}
                            onChange={setDesc}
                        />

                    </div>

                    <div className='right-column'>

                        <FormInput id="ticket"
                            inputType="text"
                            label="Ticket Price(BDT)"
                            placeholder="Event Ticket Price"
                            bgColor={'#e5e5e5'}
                            value={ticketPrice}
                            onChange={setTicketPrice}
                        />
                        
                        <br /><br />

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

                        <br /><br />

                        <FormInput id="filter"
                            inputType="text"
                            label="Email Filter"
                            placeholder="@gmail.com"
                            bgColor={'#e5e5e5'}
                            value={filter}
                            onChange={setFilter}
                        />

                    </div>

                    
                </div>

                <div className="d-grid gap-4 d-md-flex justify-content-md-start">
                    <FormButton type="button" buttonText="Back" onClick={backStage} />
                    <FormButton type="button" buttonText="Next" onClick={nextStage} />
                </div>

            </div>
        
        </>

    );
}
 
export default CreateEventStage2;