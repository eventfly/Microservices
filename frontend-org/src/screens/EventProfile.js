import EventSidebar from "../components/EventSidebar";

import FormTextArea from "../components/Form/FormTextArea";
import FormInput from "../components/Form/FormInput";
import FormTitle from "../components/Form/FormTitle";
import FormButton from "../components/Form/FormButton";
import FormSelect from "../components/Form/FormSelect";

import { useState } from "react";

import Map from "../components/CreateEvent/Map";
import DatePicker from "../components/DatePicker";

import "../styles/EventProfile.css";

const EventProfile = () => {


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

    const dateFormatter = (date) => {
        return date.split(":")[0]+':'+date.split(":")[1];
    }

    const [name, setName] = useState('Dummy event');
    const [description, setDescription] = useState('Dummy event description');
    const [tag, setTag] = useState('dummy');

    const [location, setLocation] = useState({ lat: 10, lng: 106});
    //2018-06-12T19:30 
    //2022-07-14T06:26:00.000Z

    const [startDate, setStartDate] = useState(dateFormatter("2011-06-22T19:30:00.000Z"));
    const [endDate, setEndDate] = useState(dateFormatter("2018-06-12T19:30:00.000Z"));

    const [ticketPrice, setTicketPrice] = useState(110);
    const [eventType, setEventType] = useState(eventTypeOptions[1]);
    const [eventPrivacy, setEventPrivacy] = useState(eventTypeOptions[1]);


    const handleSubmit = (e) => {

        e.preventDefault();
        console.log("name: ", name);
        console.log("description: ", description);
        console.log("tag: ", tag);

        console.log("start date:", startDate)
        console.log("location:", location)
        console.log(eventType);
        console.log(eventPrivacy);
    }

    return ( 
        <>
            <EventSidebar/>
            <div className="event-details-container">
                <h2>Event Details</h2>
                <div class="event-edit-form-container">
                <FormTitle title="Edit Event " />

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

                        <FormInput id="tag"
                            inputType="text"
                            label="Edit Event Tags"
                            placeholder="Enter tags"
                            value={tag}
                            onChange={setTag}
                        />

                        <Map DefaultLocation={location} onChange={setLocation}/>

                        <DatePicker label="Edit Start Date" defaultDate={startDate} onChange={setStartDate}/>
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
                        />


                        <FormSelect id="event-privacy"
                            label="Edit Event Privacy"
                            options={eventPrivacyOptions}
                            onChange={setEventPrivacy}
                        />

                        <FormButton type="submit" buttonText="Save" />

                    </form>
                </div>
            </div>
        </>
     );
}
 
export default EventProfile;