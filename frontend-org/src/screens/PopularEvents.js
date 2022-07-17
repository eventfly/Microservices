import EventTable from "../components/EventTable";
import { useState, useEffect } from 'react';
import axios from 'axios';

const PopularEvents = () => {

    
    const [events, setEvents] = useState('');

    useEffect( () => {
        async function fetchEvent(){
            const {data} = await axios.get('http://localhost:8000/events/test')
            setEvents(data.data["all_events"]);
        }
        fetchEvent()
    },[])

    return ( 
        <div className='PopularEvents'>
            <h2>Popular Events</h2>
            {events.length > 0 ? (
                <EventTable events={events} />
                ) : (
                <p>No events</p>
                )}
        </div>

     );
}
 
export default PopularEvents;