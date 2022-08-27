import EventTable from "../../EventTable";
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { getOrgApi } from "../../../api/axiosHook";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Col, Container, Row } from "react-bootstrap";

const EventHistory = () => {

    const navigate = useNavigate();

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }

    let token = localStorage.getItem('token')

    const [events, setEvents] = useState([]);
    const [sortedEvent, setSortedEvent] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        if (auth && auth.ref_id && loading == false) {
            
            getOrgApi(localStorage.getItem('token')).get(`/event/${auth.ref_id}`).then((res)=>{

                setEvents([...res.data])
                setSortedEvent([...res.data])

                console.log('events: ', res.data);
            }).catch((err)=>{
                console.log(err.response.data.errors)
            })

            setLoading(true)
        }
            
    }, [auth, loading])

    const handleSort = (sortBy) => {

        let newarr = events

        if(sortBy == 'name'){
            newarr.sort((a,b)=>{
                if(a.name < b.name){
                    return -1
                }
                if(a.name > b.name){
                    return 1
                }
                return 0
            })
            setSortedEvent([...newarr])
        }

        else if(sortBy == 'startDate'){
            let newarr = [...events]
            newarr.sort((a,b)=>{
                if(a.start_date < b.start_date){
                    return -1
                }
                if(a.start_date > b.start_date){
                    return 1
                }
                return 0
            })
            setSortedEvent([...newarr])
            
        }

        else if(sortBy == 'endDate'){
            let newarr = [...events]
            newarr.sort((a,b)=>{
                if(a.end_date < b.end_date){
                    return -1
                }
                if(a.end_date > b.end_date){
                    return 1
                }
                return 0
            })
            setSortedEvent([...newarr])
        }
        
    }

    return ( 
        <div className='PopularEvents'>
            <Container style={{border:'none', marginLeft:'5%', marginRight:'5%', marginTop:'20px'}}>
                <Row style={{alignItems:'center'}}>

                    <Col xs={{offset:10, span:2}}>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Sort By
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleSort('name')}>Name</Dropdown.Item>
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

            <div style={{marginBottom: '30px'}} />
            
            {events.length > 0 ? 
                (
                    <EventTable events={sortedEvent} />
                ) : 
                (
                    <p>No events</p>
                )
            }
        </div>

     );
}
 
export default EventHistory;