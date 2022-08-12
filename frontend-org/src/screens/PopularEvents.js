import EventTable from "../components/EventTable";
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { getOrgApi } from "../api/axiosHook";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Col, Container, Row } from "react-bootstrap";

const PopularEvents = () => {

    const navigate = useNavigate();

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }

    let token = localStorage.getItem('token')

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    let alldata = '';

    window.addEventListener('pageshow', (e)=>{
        setLoading(false)
    })

    useEffect(() => {
        async function fetchEvent(){
            if (auth && auth.ref_id && (loading == false || events.length == 0)) {
                
                getOrgApi(localStorage.getItem('token')).get(`/event/${auth.ref_id}`).then((res)=>{
                    console.log(res.data)

                    for(let i = 0; i < res.data.length; i++){
                        events[i] = res.data[i]
                    }

                    setEvents([...events])
                    setLoading(true)

                    console.log('events: ', events);
                }).catch((err)=>{
                    console.log(err.response.data.errors)
                })
            }
            
        }

        if(!auth && !token){
            navigate('/login')
        }

        fetchEvent()
    
    }, [auth, events, loading])

    const handleSort = (sortBy) => {
        console.log(sortBy)
    }

    return ( 
        <div className='PopularEvents'>
            <Container style={{border:'none'}}>
                <Row style={{alignItems:'center'}}>
                    <Col xs={{span:5}}>
                        <h1>Popular Events</h1>
                    </Col>
                    <Col xs={{offset:5, span:2}}>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Sort By
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleSort('rating')}>Name</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort('startDate')}>Start Date</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort('endDate')}>End Date</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort('rating')}>Rating</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort('revenue')}>Revenue</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort('attendance')}>Attendance</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Container>
=            
            {events.length > 0 ? (
                <EventTable events={events} />
                ) : (
                <p>No events</p>
                )}
        </div>

     );
}
 
export default PopularEvents;