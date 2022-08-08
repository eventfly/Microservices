import Searchbar from '../components/Searchbar';
import SlidingNav from '../components/SlidingNav';
import EventPreview from '../components/EventPreview';
import { useState, useEffect, useContext } from 'react';
import "../styles/EventList.css"

import {orgApi} from '../api/axiosHook'



const EventList = () => {

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    let alldata = '';

    window.addEventListener('pageshow', (e)=>{
        setLoading(false)
    })

    useEffect(() => {
        async function fetchEvent(){
            if (auth && auth.ref_id && (loading == false || events.length == 0)) {
                
                orgApi.get(`/event/${auth.ref_id}`).then((res)=>{
                    console.log(res.data)

                    for(let i = 0; i < res.data.length; i++){
                        events[i] = res.data[i]
                    }

                    setEvents([...events])
                    setLoading(true)

                    console.log('events: ', events);
                })
            }
            
        }
        fetchEvent()
    
    }, [auth, events, loading])

    // tab = 0 => ongoing, tab = 1 => past, tab = 2 => upcoming, tab = 3 => all
    function getTab(tab) {
        if (tab === 0) setEvents(alldata.data["ongoing_events"])
        else if (tab === 1) setEvents(alldata.data["past_events"]);
        else if (tab === 2) setEvents(alldata.data["upcoming_events"]);
        else setEvents(alldata.data["all_events"]);
    }


    return (
        <div className='EventList'>
            <Searchbar />
            <SlidingNav getData={getTab} />
            <h2>Event List</h2>
            <div className='event-container'>
                {
                    (events != null && events.length > 0) ? (
                        events.map(event => {
                            return (
                                <EventPreview key={event.id} event={event} />

                            );
                        })
                    ) : 
                    (
                        <p>No events</p>
                    )
                }

            </div>
        </div>
    );
}

export default EventList;