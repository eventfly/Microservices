import FormTitle from "../../Form/FormTitle";
import StatCard from "./StatCard";

import EventHistory from "./EventHistory";
import { useState, useEffect } from 'react';
import { getOrgApi, getParticipantApi } from "../../../api/axiosHook";



const OrgStatistics = () => {

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }

    const [loading, setLoading] = useState(false);
    const [eventsStats, setEventsStats] = useState([]);

    useEffect(() => {

        async function fetchEventStats(eventId){
            const res = await getParticipantApi(localStorage.getItem('token')).get(`/event/${eventId}/statistics`)
                
            // console.log('event stats for ', eventId, res.data);
            return res.data
        }

        if (auth && auth.ref_id && loading == false) {
            
            getOrgApi(localStorage.getItem('token')).get(`/event/${auth.ref_id}`).then((res)=>{

                console.log('events: ', res.data);

                let allStats = []

                res.data.map(async (event) => {
                    const data = await fetchEventStats(event.id)
                    allStats.push(data)

                    if(allStats.length == res.data.length){
                        console.log('all stats', allStats)
                        setEventsStats([...allStats])
                    }
                });

            }).catch((err)=>{
                console.log(err.response.data.errors)
            })

            setLoading(true)
        }
            
    }, [auth, loading, eventsStats])


    const getTotalRegisteredParticipants = () => {
        if(eventsStats.length > 0){
            let sum = 0;

            for(let i = 0; i < eventsStats.length; i++){
                sum = sum + eventsStats[i].total_participant
            }

            return sum
        }

        return 0
    }

    const getTotalIncome = () => {
        if(eventsStats.length > 0){
            let sum = 0;

            for(let i = 0; i < eventsStats.length; i++){
                sum = sum + eventsStats[i].total_income
            }

            return sum
        }

        return 0
    }


    return ( 
        <>
            <FormTitle title="Statistics" />

            <div style={{marginBottom: '100px'}} />

            <div className="stat_info_flexbox">
                
                <StatCard 
                    header={'Total Registered Participants'} 
                    body={getTotalRegisteredParticipants()} 
                />
                
                <StatCard 
                    header={'Total Hosted Events'} 
                    body={eventsStats ? eventsStats.length : 0} 
                />
                
                <StatCard 
                    header={'Total Earnings'} 
                    body={getTotalIncome() + ' BDT'} 
                />
                
            </div>

            <EventHistory eventsStats={eventsStats ? eventsStats : []} />
        </>
     );
}
 
export default OrgStatistics;