import "../styles/EventPage.css";
import EventSidebar from "../components/EventSidebar";
import { useLocation, useNavigate } from 'react-router-dom';

import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'

import EventProfile from "./EventProfile";
import EventFeed from "./EventFeed";
import EventStatistics from "./EventStatistics";
import EventMember from "./EventMember";
import AddStaff from "./AddStaff";
import EventThumbnail from "../components/Event/EventThumbnail";
import EventTicket from "./EventTicket";
import EventFeedback from "./EventFeedback";

import FormTitle from "../components/Form/FormTitle";

import {getEventApi, getOrgApi} from '../api/axiosHook'
import QuizResultDetails from "../components/Feed/Quiz/QuizResultDetails";

const EventPage = () => {
    const navigate = useNavigate();
    const location = useLocation().pathname;

    const { eventId } = useParams();

    let pageTitle = location.includes('profile') ? 'Profile' :
                    (location.includes('discussion') ? 'Discussion' :
                    (location.includes('statistics') ? 'Statistics' :
                    (location.includes('members') ? 'Members' :
                    (location.includes('tickets') ? 'Tickets' :
                    (location.includes('feedback') ? 'Feedback' :
                    (location.includes('staff/add') ? 'Add Staff' : '' ))))))

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }
    let token = localStorage.getItem('token')

    const [event, setEvent] = useState(null);
    const [tags, setTags] = useState([])
    const [orgStaffs, setOrgStaffs] = useState([]);
    const [orgRoles, setOrgRoles] = useState([]);
    const [loading, setLoading] = useState(false);

    const [loadingMember, setLoadingMember] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(false);

    const [isSelf, setIsSelf] = useState(false)


    const isPageEditable = () => {
        if(!isSelf){
            return false
        }
        if(auth.role == 'Organizer' || auth.role == 'Manager'){
            return true
        }
        return false
    }


    useEffect(() => {
        if(!auth && !token){
            navigate('/login')
        }

        async function fetchEventData(){
            if (auth && auth.ref_id && 
                (loading == false || loadingMember == false || loadingProfile == false)) {

                    console.log(loading, loadingMember, loadingProfile)

                getOrgApi(localStorage.getItem('token')).get('/tag').then((res)=>{
                    console.log(res.data)

                    for(let i = 0; i < res.data.length; i++){
                        tags[i] = res.data[i]
                    }

                    setTags([...tags]);

                })
                .catch((err)=>{
                    console.log(err.response.data.errors)
                })

                getEventApi(localStorage.getItem('token')).get(`/${eventId}`).then((res)=>{
                    console.log(res.data)
                    setEvent(res.data)

                    let isStaffAssigned = []

                    if(auth.role != 'Organizer' && auth.role != 'Manager'){
                        isStaffAssigned = auth.events.filter((event)=>{
                            return event.eventId == eventId
                        })
                    }

                    if((auth.ref_id == res.data.organizer || 
                        (auth.role == 'Manager' && auth.parentOrg == res.data.organizer )) || 
                        (auth.parentOrg == res.data.organizer && isStaffAssigned.length == 1)){

                        setIsSelf(true)
                
                        getOrgApi(localStorage.getItem('token')).get(`/${res.data.organizer}/staffs`).then((res)=>{
                            console.log(res.data.staffs)
                            setOrgStaffs([...res.data.staffs])
                        
                        }).catch((err)=>{
                            console.log(err)
                        })

                        getOrgApi(localStorage.getItem('token')).get(`/${res.data.organizer}/roles`).then((res)=>{
                            console.log(res.data.roles)
                            setOrgRoles([...res.data.roles])
                        
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }

                    else{
                        setIsSelf(false)
                    }
                
                
                }).catch((err)=>{
                    console.log(err)
                })

                setLoading(true)
                setLoadingMember(true)
                setLoadingProfile(true)
                setEvent(null)
            }
            
        }

        fetchEventData()
    
    }, [auth, tags, event, loading, loadingMember, loadingProfile])


    return ( 
        auth && <>
        
            <div className="detail_flexbox">

                <div className="left-column">
                    {
                        isSelf ? <EventSidebar eventId={eventId} /> : <></>
                    }
                </div>

                <div className="right-column">

                    <div className="event-page-header">

                        {/* <div className="event-name"> */}
                            {/* <FormTitle title={pageTitle} color={'#8C3522'} fontWeight={600} /> */}
                            <h2 className="event-name"> {pageTitle} </h2>
                        {/* </div> */}
                        <EventThumbnail 
                            image={event ? event.banner_url : ''} 
                            title={event ? event.name : ''} 
                        />

                    </div>

                    {
                        location.includes('profile') ? (
                            <EventProfile 
                                event={event} 
                                allTags={tags}
                                setLoading={setLoadingProfile}
                                isEditable={isPageEditable()} 
                            />
                        ) :
                        (
                            location.includes('discussion') ? 
                            (
                                location.includes('quiz') ? <QuizResultDetails /> : <EventFeed />
                            ) 
                            :

                            (
                                location.includes('statistics') ? <EventStatistics /> :

                                (
                                    location.includes('staff/add') ? <AddStaff /> :

                                    (
                                        location.includes('members') ? (
                                            <EventMember
                                                event={event}
                                                setEvent={setEvent}
                                                orgRoles={orgRoles}
                                                orgStaffs={orgStaffs}
                                                // managers={[auth]}
                                                setLoading={setLoadingMember}
                                            />
                                        ) : 
                                        
                                        
                                        location.includes('tickets') ? (
                                            <EventTicket
                                                event={event} 
                                                setEvent={setEvent} 
                                            />
                                        ) : 

                                        (
                                            location.includes('feedback') ? (
                                                <EventFeedback />
                                            ) : 

                                            (<></>)
                                        )
                                    
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