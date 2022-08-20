// import {Link} from 'react-router-dom'

import Map from '../Event/Map';
import MapBox from '../Event/MapBox';

import FormTextArea from '../Form/FormTextArea';
import FormButton from '../Form/FormButton';
import FormInput from '../Form/FormInput';
import FormSelect from '../Form/FormSelect';
import DatePicker from '../Event/DatePicker';


const CreateEventStage2 = ({desc, setDesc, ticketPrice, setTicketPrice, type, setType, setPrivacy, 
        filter, setFilter, setStartDate, setEndDate, backStage, nextStage, zoomLink, setZoomLink, 
        setLocation
    }) => {
    

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

    console.log(`aaaaaaaaaaa ${type}`)

    const onDragMarker = (lat, lng) => {
        console.log(lat, lng)
        setLocation({lat:lat, lng:lng})
    }


    return ( 

        <>
        
            <div style={{ marginTop: "40px", paddingLeft: "3.5rem" }}>
                <h2>Create New Event (2/3)</h2>
            </div>

            <div className='stage2-content'>

                <div className='CreateEvent2'>
                    <div className='left-column'>

                        <FormTextArea id="description"
                            label="Event Description"
                            placeholder="Enter description"
                            height={'300px'}
                            bgColor={'#e5e5e5'}
                            value={desc}
                            onChange={setDesc}
                        />

                        <div style={{ marginBottom: '42px' }} />

                        <MapBox 
                            defaultLat={23.8} 
                            defaultLng={90.4} 
                            onDrag={onDragMarker}
                            displayType={type === 'Offline' ? 'block' : 'none'}
                            displayMarker={type === 'Offline' ? 'block' : 'none'}
                            isDraggable={true} 
                        />

                    </div>

                    <div className='right-column'>
                        
                        <div style={{ marginBottom: '40px' }} />

                        <DatePicker label="Start Date" onChange={setStartDate}/>

                        <div style={{ marginBottom: '40px' }} />
                        
                        <DatePicker label="End Date" onChange={setEndDate}/>

                        <div style={{ marginBottom: '40px' }} />

                        <FormSelect id="type"
                            label="Event Type"
                            bgColor={'#e5e5e5'}
                            options={eventType}
                            onChange={setType}
                        />

                        <div style={{ 
                                marginBottom: `${type == 'Offline' ? '0px' : '40px'}` 
                            }}
                        />


                        <FormInput id="zoomLink"
                            inputType={'text'}
                            label="Meeting Link"
                            placeholder="Enter Meeting Link"
                            bgColor={'#e5e5e5'}
                            value={zoomLink}
                            onChange={setZoomLink}
                            displayType={type === 'Offline' ? 'none' : 'block'}
                        />  


                        <div style={{ marginBottom: '40px' }} />

                        <FormSelect id="privacy"
                            label="Event Privacy"
                            bgColor={'#e5e5e5'}
                            options={eventPrivacy}
                            onChange={setPrivacy}
                        />

                        <div style={{ marginBottom: '40px' }} />

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

                <div style={{ marginBottom: '40px' }} />

                <div className="d-grid gap-4 d-md-flex justify-content-md-start">
                    <FormButton type="button" buttonText="Back" onClick={backStage} />
                    <FormButton type="button" buttonText="Next" onClick={nextStage} />
                </div>

            </div>
        
        </>

    );
}
 
export default CreateEventStage2;