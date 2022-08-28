
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import TicketModal from "../components/Ticket/TicketModal";
import ListGroup from 'react-bootstrap/ListGroup';

import { useState, useEffect } from "react";
// import {getEventApi} from '../api/axiosHook'

import {ColorArray} from '../constants/Color';

const EventTicket = ({setEvent, event}) => {

    const [ticketClasses, setTicketClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    
    let ticketClassOptions = [
        {
            'id': 1,
            'name': 'General'
        },
        {
            'id': 2,
            'name': 'Business'
        },
        {
            'id': 3,
            'name': 'Premium'
        }
    ]


    useEffect(()=>{

        if(loading == false && event){
            setLoading(true)
            setTicketClasses([...event.tickets])
        }

    }, [loading, event, ticketClasses])


    return ( 

        <>

            <Col xs={{ span: 2, offset: 10 }} className="py-3">
                <TicketModal 
                    setEvent={setEvent} 
                    existedClasses={event ? event.tickets : []}
                    setEventTicketLoading={setLoading} 
                />
            </Col>

            <div style={{marginBottom: '50px'}}></div>

            <Row xs={1} md={3} className="g-4">

                {
                    ticketClasses && ticketClasses.map((ticketClass, idx) => (
                        <Col key={idx} style={{marginRight:'2rem'}}>
                            <Card className="text-center">
                            <Card.Header className={`fs-3 ${ColorArray[idx%ticketClasses.length]}`}>{ticketClass.class}</Card.Header>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item><strong>Ticket Price:</strong> {ticketClass.price}</ListGroup.Item>
                                        <ListGroup.Item><strong>Quantity:</strong> {ticketClass.quantity}</ListGroup.Item>
                                        <ListGroup.Item><strong>Sold:</strong> {ticketClass.quantity-ticketClass.available}</ListGroup.Item>
                                        <ListGroup.Item><strong>Remaining:</strong> {ticketClass.available}</ListGroup.Item>
                                        
                                        <ListGroup.Item>
                                        <strong>Tokens:</strong>
                                            <ul>
                                                {
                                                    ticketClass.tokens.map((token, index)=>{
                                                        return(
                                                            <li key={index}>
                                                                {token}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>

                                        </ListGroup.Item>
                                    
                                    
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            
        </>


    );
}
 
export default EventTicket;