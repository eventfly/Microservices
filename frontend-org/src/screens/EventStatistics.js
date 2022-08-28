import '../styles/EventStatistics.css'
import { Table } from 'react-bootstrap';
import StatCard from '../components/Profile/OrgProfileMenu/StatCard';
import { useState, useEffect } from 'react';
import {getParticipantApi} from '../api/axiosHook'
import { useParams } from 'react-router-dom';


const EventStatistics = () => {

    const [loading, setLoading] = useState(false);
    const [eventsStats, setEventsStats] = useState(null);

    const { eventId } = useParams();

    useEffect(() => {

        async function fetchEventStats(){
            const res = await getParticipantApi(localStorage.getItem('token')).get(`/event/${eventId}/statistics`)
            console.log(res.data)
            setEventsStats(res.data)
        }

        if(loading == false){
            setLoading(true)
            fetchEventStats()
        }

    }, [loading, eventsStats])

    
    const getTicketSale = () => {
        if(eventsStats){
            let sum = 0

            eventsStats.orders.map((order, index) =>{
                for(let i = 0; i < order.tickets.length; i++){
                    sum = sum + order.tickets[i].price
                }
            })

            return sum
        }

        return 0
    }

    const getCreationDate = (dateISO) =>{
        let date = new Date(dateISO)
        let dateStr = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
        dateStr = dateStr + '\n' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

        return dateStr
    }


    return ( 
        <>

            <div className="info-flexbox">

                <StatCard 
                    header={'Participants checked in'} 
                    body={eventsStats ? (eventsStats.total_attendance+'/'+eventsStats.total_participant) : '0/0'} 
                />
                
                <StatCard 
                    header={'Rating'} 
                    body={eventsStats ? eventsStats.total_rating : 0} 
                />
                
                <StatCard 
                    header={'Ticket Sale'} 
                    body={getTicketSale() + ' BDT'} 
                />

            </div>

            <div style={{marginBottom: '30px'}} />

            <div className="table-container">

                <h4 style ={{ textAlign: "center", fontWeight: 'bold'}}>Latest Sales Info</h4>
                <div style={{marginBottom: '40px'}} />

                <Table style ={{ textAlign: "center"}} striped bordered hover >

                    <thead>
                        <tr>
                        {/* <th>Name</th> */}
                        <th>E-mail</th>
                        <th>Purchase Date</th>
                        <th>Transaction ID</th>
                        <th>Status</th>
                        <th>Ticket Class</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        (
                            eventsStats && eventsStats.orders.map((order, index) =>{
                                return (
                                    <tr key={index}>
                                        {/* <td> {order.user_id.name} </td> */}
                                        <td> {order.user_id.email} </td>
                                        <td> {getCreationDate(order.created_at)} </td>
                                        <td> {order._id} </td>
                                        <td> {order.status} </td>
                                        
                                        <td>

                                            {
                                                order.tickets.map((ticket, tktId)=>{
                                                    return (String(ticket.class + '\n'))
                                                })
                                            }
                                        
                                        </td>
                                    
                                    </tr>

                                );
                            })
                        ) 
                    }
                    </tbody>
                
                </Table>
                
            </div>
        
        </>
        
     );
}
 
export default EventStatistics;