import Searchbar from '../components/Searchbar';
import SlidingNav from '../components/SlidingNav';
import EventPreview from '../components/EventPreview';
import { useState, useEffect } from 'react';
import axios from 'axios';


const EventList = () => {
    
    const [events, setEvents] = useState('');
    const [alldata, setAlldata] = useState('');

    useEffect( () => {
        async function fetchEvent(){
            const {data} = await axios.get('http://localhost:8000/events/test')
            setEvents(data.data["all_events"]);
            setAlldata(data)
        }
        fetchEvent()
    },[])

    // tab = 0 => ongoing, tab = 1 => past, tab = 2 => upcoming, tab = 3 => all
    function getTab(tab){
        if(tab === 0) setEvents(alldata.data["ongoing_events"])
        else if(tab === 1) setEvents(alldata.data["past_events"]);
        else if(tab === 2) setEvents(alldata.data["upcoming_events"]);
        else setEvents(alldata.data["all_events"]);
    }
        

    return ( 
        <div className='EventList'>
            <Searchbar />
            <SlidingNav getData={getTab}/>
            <h2>Event List</h2>
            <div className='event-container'>
            {events.length > 0 ? (
                events.map(event =>{
                    console.log(event);
                    return (
                        <EventPreview key={event.id} event={event} />

                      );
                })
                ) : (
                <p>No events</p>
                )}
                
            </div>
        </div>
     );
}
 
export default EventList;