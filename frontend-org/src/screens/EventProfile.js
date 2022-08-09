import EventSidebar from "../components/EventSidebar";

import FormTextArea from "../components/Form/FormTextArea";
import FormInput from "../components/Form/FormInput";
import FormTitle from "../components/Form/FormTitle";
import FormButton from "../components/Form/FormButton";
import FormSelect from "../components/Form/FormSelect";

import { useState, useEffect } from "react";

import Map from "../components/Event/Map";
import DatePicker from "../components/Event/DatePicker";
import AutoComplete from "../components/AutoComplete";
import EventCard from "../components/Event/EventCard";
import {eventApi} from '../api/axiosHook'

import "../styles/EventProfile.css";

const EventProfile = ({event, allTags, setLoading}) => {

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

        if(event){
            setName(event.name)
            setDescription(event.description)

            for(let i = 0; i < event.tags.length; i++){
                multiSelections[i] = event.tags[i].name
            }

            setMultiSelections([...multiSelections])

            setStartDate(dateFormatter(event.start_date))
            setEndDate(dateFormatter(event.end_date));
            setTicketPrice(event.ticket_price);

            setEventType(event.type)
            setEventPrivacy(event.privacy)

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

        let body = {
            type: eventType,
            start: new Date(startDate).toISOString(),
            privacy: eventPrivacy,
            name: name,
            banner_url: event.banner_url,
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

        eventApi.put(`/${event.ref_id}`, body).then((res)=>{
            console.log(res)
            setLoading(false)
        })

    }

    return ( 
        event && 
        <>

            <div className="event-details-container">
                {/* <FormTitle title="Edit Event" /> */}

                <EventCard  
                    name={name}
                    description={description}
                    startDate={startDate}
                    endDate={endDate}
                    banner={event.banner_url}
                />

                <form onSubmit={handleSubmit}>

                    <FormInput id="name"
                        inputType="text"
                        label="Name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={setName}
                    />

                    <br />

                    <FormTextArea id="description"
                        label="Description"
                        placeholder="Enter description"
                        value={description}
                        onChange={setDescription}
                    />
                    <br />

                    <AutoComplete
                        options={tagOptions}
                        multiSelections={multiSelections}
                        setMultiSelections={setMultiSelections} 
                    />

                    {/* <Map DefaultLocation={location} onChange={setLocation}/> */}

                    <br /><br />
                    <DatePicker label="Start Date" defaultDate={startDate} onChange={setStartDate}/>
                    
                    <br /><br />
                    <DatePicker label="End Date" defaultDate={endDate} onChange={setEndDate}/>

                    <br /><br />

                    <FormInput id="ticketPrice"
                        inputType="text"
                        label="Ticket Price"
                        placeholder="Enter Ticket Price"
                        value={ticketPrice}
                        onChange={setTicketPrice}
                    />

                    <br />

                    <FormSelect id="event-type"
                        label="Event Type"
                        options={eventTypeOptions}
                        onChange={setEventType}
                        defaultValue={eventType}
                    />

                    <br />
                    <FormSelect id="event-privacy"
                        label="Event Privacy"
                        options={eventPrivacyOptions}
                        onChange={setEventPrivacy}
                        defaultValue={eventPrivacy}
                    />
                    <br />
                    <FormButton type="submit" buttonText="Save" />

                </form>
            
            </div>
        </>
     );
}
 
export default EventProfile;