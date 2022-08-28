import EventTable from "../../EventTable";
import { useState, useEffect } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import { Col, Container, Row } from "react-bootstrap";

const EventHistory = ({eventsStats}) => {

    const [sortedEvent, setSortedEvent] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if(loading == false || eventsStats.length > 0){
            setLoading(true)

            if(eventsStats.length > 0){
                setSortedEvent([...eventsStats])
            }
        }

    }, [loading, eventsStats])


    const handleSort = (sortBy) => {

        let newarr = eventsStats

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

        else if(sortBy == 'rating'){
            newarr.sort((a,b)=>{
                if(a.total_rating > b.total_rating){
                    return -1
                }
                if(a.total_rating < b.total_rating){
                    return 1
                }
                return 0
            })
            setSortedEvent([...newarr])
        }

        else if(sortBy == 'revenue'){
            newarr.sort((a,b)=>{
                if(a.total_income > b.total_income){
                    return -1
                }
                if(a.total_income < b.total_income){
                    return 1
                }
                return 0
            })
            setSortedEvent([...newarr])
        }

        else if(sortBy == 'participants'){
            newarr.sort((a,b)=>{
                if(a.total_participant > b.total_participant){
                    return -1
                }
                if(a.total_participant < b.total_participant){
                    return 1
                }
                return 0
            })
            setSortedEvent([...newarr])
        }

        else if(sortBy == 'attendance'){
            newarr.sort((a,b)=>{
                if(a.total_attendance > b.total_attendance){
                    return -1
                }
                if(a.total_attendance < b.total_attendance){
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
                                <Dropdown.Item onClick={() => handleSort('participants')}>Participants</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort('attendance')}>Attendance</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                
                </Row>
            </Container>

            <div style={{marginBottom: '30px'}} />
            
            {eventsStats.length > 0 ? 
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