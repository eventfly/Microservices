
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import TicketModal from "../components/Ticket/TicketModal";
import ListGroup from 'react-bootstrap/ListGroup';

const EventTicket = ({setEvent}) => {

    
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

    return ( 

        <>

            <Col xs={{ span: 2, offset: 10 }} className="py-3">
                <TicketModal setEvent={setEvent} />
            </Col>
            <Row xs={1} md={3} className="g-4">
      {
            ticketClassOptions.map((_, idx) => (
                <Col>
                    <Card className="text-center">
                    <Card.Header className="fs-3" style={{backgroundColor:'salmon'}}>ticket class</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Ticket Price: 80</ListGroup.Item>
                                <ListGroup.Item>Quantity: </ListGroup.Item>
                                <ListGroup.Item>Sold: </ListGroup.Item>
                                <ListGroup.Item>Remaining: </ListGroup.Item>
                                <ListGroup.Item>Tokens: </ListGroup.Item>
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