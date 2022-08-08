import EventSidebar from "../components/EventSidebar";

import FormTextArea from "../components/Form/FormTextArea";
import FormInput from "../components/Form/FormInput";
import FormTitle from "../components/Form/FormTitle";
import FormButton from "../components/Form/FormButton";
import FormSelect from "../components/Form/FormSelect";

import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'

import Map from "../components/CreateEvent/Map";
import DatePicker from "../components/DatePicker";
import {eventApi} from '../api/axiosHook'

import "../styles/EventProfile.css";

const EventProfile = ({event, allTags}) => {


    let eventTypeOptions = [
        {
            'id': 1,
            'name': 'Offline'
        },
        {
            'id': 2,
            'name': 'Online'
        }
    ]

    let eventPrivacyOptions = [
        {
            'id': 1,
            'name': 'Public'
        },
        {
            'id': 2,
            'name': 'Private'
        }
    ]

    console.log("event page:", event)


    const dateFormatter = (date) => {
        return date.split(":")[0]+':'+date.split(":")[1];
    }

    const [name, setName] = useState('Dummy event');
    const [description, setDescription] = useState('Dummy event description');

    const [location, setLocation] = useState({ lat: 10, lng: 106});
    //2018-06-12T19:30 
    //2022-07-14T06:26:00.000Z

    const [startDate, setStartDate] = useState(dateFormatter("2011-06-22T19:30:00.000Z"));
    const [endDate, setEndDate] = useState(dateFormatter("2018-06-12T19:30:00.000Z"));

    const [ticketPrice, setTicketPrice] = useState(110);
    const [eventType, setEventType] = useState(eventTypeOptions[1].name);
    const [eventPrivacy, setEventPrivacy] = useState(eventPrivacyOptions[0].name);

    const [tagOptions, setTagOptions] = useState([]);
    const [multiSelections, setMultiSelections] = useState([]);

    const [mailList, setMailList] = useState('')
    const [filter, setFilter] = useState('')



    useEffect(() => {
        async function fetchEventData(){
            if (auth.ref_id) {
                console.log(eventId)
                eventApi.get(`/${eventId}`).then((res)=>{
                    console.log(res.data)

                    setName(res.data.name);
                    setDescription(res.data.description);
                    //setTag(res.data.tag);

                    setStartDate(dateFormatter(res.data.start_date));
                    setEndDate(dateFormatter(res.data.end_date));

                    setTicketPrice(res.data.ticket_price);
                    setEventType(res.data.type);

            setMailList([...event.mailList])
        }

        if(allTags){
            for(let i = 0; i < allTags.length; i++){
                tagOptions[i] = allTags[i].name
            }

            setTagOptions([...tagOptions])
        }

    
    }, [event, allTags])


    const handleSubmit = (e) => {

        e.preventDefault();
        console.log("name: ", name);
        console.log("description: ", description);

        console.log("start date:", startDate)
        console.log("location:", location)
        console.log(eventType);
        console.log(eventPrivacy);

        let event = {
            type: eventType,
            start: new Date(startDate).toISOString(),
            privacy: eventPrivacy,
            name: name,
            // banner_url: bannerImage,
            end: new Date(endDate).toISOString(),
            desc: description,
            tags: multiSelections.map((tag)=>{
                return {'name': tag}
            }),
            ticket: parseInt(ticketPrice),
            // mailList: [
            //     sessionStorage.getItem('event_maillist')
            // ],
            // filter: [
            //     sessionStorage.getItem('event_filter')
            // ]
        }
        console.log(event);
    }

    return ( 
        <>

            <div className="event-details-container">
                <div className="event-edit-form-container">
                <FormTitle title="Edit Event" />

                    <form onSubmit={handleSubmit}>

                        <FormInput id="name"
                            inputType="text"
                            label="Name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={setName}
                        />

                        <FormTextArea id="description"
                            label="Edit Event Description"
                            placeholder="Enter description"
                            value={description}
                            onChange={setDescription}
                        />


                        <AutoComplete
                            options={tagOptions}
                            multiSelections={multiSelections}
                            setMultiSelections={setMultiSelections} 
                        />

                        <br></br>
                        <Map DefaultLocation={location} onChange={setLocation}/>

                        <br></br>
                        <DatePicker label="Edit Start Date" defaultDate={startDate} onChange={setStartDate}/>
                        
                        <br></br>
                        <DatePicker label="Edit End Date" defaultDate={endDate} onChange={setEndDate}/>



                        <FormInput id="ticketPrice"
                            inputType="text"
                            label="Edit Ticket Price"
                            placeholder="Enter Ticket Price"
                            value={ticketPrice}
                            onChange={setTicketPrice}
                        />


                        <FormSelect id="event-type"
                            label="Edit Event Type"
                            options={eventTypeOptions}
                            onChange={setEventType}
                            defaultValue={eventType}
                        />


                        <FormSelect id="event-privacy"
                            label="Edit Event Privacy"
                            options={eventPrivacyOptions}
                            onChange={setEventPrivacy}
                            defaultValue={eventPrivacy}
                        />

                        <FormButton type="submit" buttonText="Save" />

                    </form>
                </div>
            </div>
        </>
     );
}
 
export default EventProfile;