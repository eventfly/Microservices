import Searchbar from '../components/Searchbar';
import SlidingNav from '../components/SlidingNav';
import EventPreview from '../components/EventPreview';
import { useState, useEffect } from 'react';
import "../styles/EventList.css"
import { useNavigate} from 'react-router-dom';

import {getOrgApi} from '../api/axiosHook'

import Spinner from '../components/Spinner';



const EventList = () => {

    const navigate = useNavigate();

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }

    let token = localStorage.getItem('token')

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [eventSubset, setEventSubset] = useState([]);

    let alldata = '';

    // window.addEventListener('pageshow', (e)=>{
    //     console.log("pageshow")
    //     setLoading(false)
    // })

    useEffect(() => {
        async function fetchEvent(){
            if (auth && auth.ref_id && (loading == false)) {
                console.log("loading", loading)

                let route = `/event/${auth.ref_id}`
                if(auth.role != 'Organizer' || auth.role != 'Manager'){
                    route = `/event/staff/${auth.ref_id}`
                }
                
                getOrgApi(localStorage.getItem('token')).get(route).then((res)=>{
                    console.log(res.data)

                    for(let i = 0; i < res.data.length; i++){
                        events[i] = res.data[i]
                    }

                    setEvents([...events])
                    setEventSubset([...events])

                    console.log('events: ', events);
                }).catch((err)=>{
                    console.log(err.response.data.errors)
                })

                setLoading(true)
                setEvents([])
            }
            
        }

        if(!auth && !token){
            navigate('/login')
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

    const isPageEditable = () => {
        if(auth.role == 'Organizer' || auth.role == 'Manager'){
            return true
        }
        return false
    }


    let subset = [];
    useEffect(() => {
        console.log(searchText)
        if (searchText.length === 0) {
            subset = events
            setEventSubset([...subset])
        }
        else {
            subset = events.filter((event) => {
                return event.name.toLowerCase().includes(searchText.toLowerCase())
            }
            )
            console.log(subset, subset.length)
            setEventSubset([...subset])
        }
    }, [searchText])


    return (
        auth && <div className='EventList'>
            <Searchbar searchText={searchText} setSearchText={setSearchText} />
            <SlidingNav getData={getTab} canCreateEvent={isPageEditable() ? 'block' : 'none'} />
            <h2>Event List</h2>
            <div className='event-container'>
                {/* {
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
                } */}

                {
                    (eventSubset != null && eventSubset.length > 0) ? (
                        eventSubset.map(event => {
                            return (
                                <EventPreview key={event.id} event={event} />

                            );
                        })
                    ) : 
                    (
                        <p>No events</p>
                        // <Spinner />
                    )
                    
                }
            </div>
        </div>
    );
}

export default EventList;