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

    const [name, setName] = useState('Dummy event');
    const [description, setDescription] = useState('Dummy event description');
    const [tag, setTag] = useState('dummy');

    const [location, setLocation] = useState({ lat: 10, lng: 106});
    //2018-06-12T19:30 
    //2022-07-14T06:26:00.000Z
    const [startDate, setStartDate] = useState("2018-06-12T19:30");

    const [ticketPrice, setTicketPrice] = useState(110);
    const [eventType, setEventType] = useState('Public');
    const [EventPrivacy, setEventPrivacy] = useState('Public');


    const handleSubmit = (e) => {

        e.preventDefault();
        console.log("name: ", name);
        console.log("description: ", description);
        console.log("tag: ", tag);

        console.log("start date:", startDate)
        console.log("location:", location)
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


                        <FormInput id="ticketPrice"
                            inputType="text"
                            label="Edit Ticket Price"
                            placeholder="Enter Ticket Price"
                            value={ticketPrice}
                            onChange={setTicketPrice}
                        />


                        <FormSelect id="event-type"
                            label="Edit Event Type"
                            options={['Public', 'Private']}
                            onChange={setEventType}
                        />

                        <FormButton type="submit" buttonText="Save" />

                    </form>
                </div>
            </div>
        </>
     );
}
 
export default EventProfile;