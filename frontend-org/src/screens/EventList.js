import Searchbar from '../components/Searchbar';
import SlidingNav from '../components/SlidingNav';
import EventPreview from '../components/EventPreview';
import { useState, useEffect } from 'react';
import "../styles/EventList.css"
import { useNavigate} from 'react-router-dom';

import {getOrgApi, getAnalyticsApi, getEventApi} from '../api/axiosHook'

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

    // let currentTime = new Date('2022-09-23T14:52:00.000Z').getTime()


    const getOngoingEvents = () => {
        if(events && events.length > 0){

            let currentTime = new Date().getTime()

            let temp = events.filter((event)=>{
                let start = new Date(event.start_date).getTime()
                let end = new Date(event.end_date).getTime()

                return (currentTime <= end && currentTime >= start)
            })

            return temp
        }

        return []
    }

    const getUpcomingEvents = () => {
        if(events && events.length > 0){

            let currentTime = new Date().getTime()

            let temp = events.filter((event)=>{
                let start = new Date(event.start_date).getTime()

                return (currentTime < start)
            })

            return temp
        }

        return []
    }

    const getFinishedEvents = () => {
        if(events && events.length > 0){

            let currentTime = new Date().getTime()

            let temp = events.filter((event)=>{
                let end = new Date(event.end_date).getTime()

                return (currentTime > end)
            })

            return temp
        }

        return []
    }


    useEffect(() => {
        async function fetchEvent(){
            if (auth && auth.ref_id && (loading == false)) {
                console.log("loading", loading)

                let route = `/event/${auth.ref_id}`
                if(auth.role != 'Organizer' && auth.role != 'Manager'){
                    route = `/event/staff/${auth.ref_id}`
                }
                else if(auth.role == 'Manager'){
                    route = `/event/${auth.parentOrg}`
                }
                
                getOrgApi(localStorage.getItem('token')).get(route).then((res)=>{
                    console.log(res.data)

                    for(let i = 0; i < res.data.length; i++){
                        events[i] = res.data[i]
                    }

                    setEvents([...events])
                    setEventSubset([...events])

                }).catch((err)=>{
                    console.log(err)
                })

                setLoading(true)
                setEvents([])
            }
            
        }

        if(!auth && !token){
            navigate('/login')
        }

        fetchEvent()
    
    }, [auth, events, loading, eventSubset])


    function getTab(tab) {

        if (tab == 0) {
            setEventSubset([...getOngoingEvents()])
        }

        else if (tab == 1) {
            setEventSubset([...getFinishedEvents()])
        }

        else if (tab == 2){
            setEventSubset([...getUpcomingEvents()])
        }
        
        else{
            setEventSubset([...events])
        }
    }

    const isPageEditable = () => {
        if(auth.role == 'Organizer' || auth.role == 'Manager'){
            return true
        }
        return false
    }


    const handleKeyDown = async (e) => {
        if(e.key === 'Enter'){

            const res = await getAnalyticsApi(localStorage.getItem('token')).post('/search/query', {
                query: searchText
            })
            console.log(res.data.events)

            let searchResult = []

            res.data.events.map(async(ev_id)=>{
                const event_data = await getEventApi(localStorage.getItem('token')).get(`/${ev_id}`)

                event_data.data.id = event_data.data.ref_id
                delete event_data.data.ref_id
                searchResult.push(event_data.data)

                if(res.data.events.length == searchResult.length){
                    setEventSubset([...searchResult])
                    console.log(searchResult)
                }
            })


        }
    }


    return (
        auth && <div className='EventList'>

            <div onKeyDown={handleKeyDown}>
                <Searchbar 
                    searchText={searchText} 
                    setSearchText={setSearchText} 
                />
            </div>


            <SlidingNav getData={getTab} canCreateEvent={isPageEditable() ? 'block' : 'none'} />
            
            <h2>Event List</h2>
            
            <div className='event-container'>

                {
                    (eventSubset != null && eventSubset.length > 0) ? (
                        eventSubset.map(event => {
                            return (
                                <EventPreview 
                                    key={event.id} 
                                    event={event} 
                                    eventId={event.id} 
                                />

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