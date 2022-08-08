import "../styles/EventPage.css";
import EventSidebar from "../components/EventSidebar";
import { useLocation } from 'react-router-dom';

import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'

import EventProfile from "./EventProfile";
import EventFeed from "./EventFeed";
import EventStatistics from "./EventStatistics";
import EventStaff from "./EventStaff";
import AddStaff from "./AddStaff";

import {eventApi, orgApi} from '../api/axiosHook'

const EventPage = () => {
    const location = useLocation();
    console.log(location.pathname);

    const { eventId } = useParams();

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }

    const [event, setEvent] = useState(null);
    const [tags, setTags] = useState([])
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchEventData(){
            if (auth.ref_id && (loading == false || event == null)) {

                orgApi.get('/tag').then((res)=>{
                    console.log(res.data)

                    for(let i = 0; i < res.data.length; i++){
                        tags[i] = res.data[i]
                    }

                    setTags([...tags]);

                    eventApi.get(`/${eventId}`).then((res)=>{
                        setEvent(res.data)
                        setLoading(true)
    
                        console.log('event: ', event);
                    })
                })
            }
            
        }

        fetchEventData()
    
    }, [tags, event, loading])


    return ( 
        <>
        
            <div className="detail_flexbox">

                <div className="left-column">
                    <EventSidebar eventId={eventId} />
                </div>

                <div className="right-column">

                    {
                        location.pathname.includes('profile') ? (
                            <EventProfile event={event} allTags={tags} />
                        ) :
                        (
                            location.pathname.includes('discussion') ? <EventFeed /> :

                            (
                                location.pathname.includes('statistics') ? <EventStatistics /> :

                                (
                                    location.pathname.includes('staff/add') ? <AddStaff /> :

                                    (
                                        location.pathname.includes('staff') ? <EventStaff /> : 

                                        (<></>)
                                    
                                    )
                                )
                            )
                        )
                    }

                </div>
                
            </div>
        
        </>
    );
}
 
export default EventPage;