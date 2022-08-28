import { Col,Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';

const FeedbackCard = () => {
    return ( 
        <>
            <Card 
                style={{
                    width: '70%',
                    backgroundColor:'#FFFCFC',
                    
                }}
                className="mx-4"
            >
                <Card.Body>
                    <Rating rating={4} />
                    <Card.Title className = "fw-bolder fs-3">Goodmovie</Card.Title>
                    <Card.Subtitle >
                        <Row>
                            <Col xs={{span:4}} className="fs-6">
                                jawad
                            </Col>
                            <Col className="mb-2 text-muted fs-6" xs={{offset:2 , span:4}}>
                                28 aguut 2099
                            </Col>
                        </Row>
                    </Card.Subtitle>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
     );
}
 
export default FeedbackCard;