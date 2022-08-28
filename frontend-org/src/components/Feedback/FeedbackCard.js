import { Col,Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';

const FeedbackCard = ({feedbackData}) => {

    const getCreationDate = (dateISO) =>{
        let date = new Date(dateISO)
        let dateStr = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
        dateStr = dateStr + '\n' + 
                    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + 
                    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + 
                    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())

        return dateStr
    }

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
                    <Rating rating={feedbackData.rating} />
                    <Card.Title className = "fw-bolder"> {feedbackData.user_id.name} </Card.Title>
                    <Card.Subtitle >
                        <Row>
                            <Col xs={{span:4}} className="fs-6">
                                {feedbackData.user_id.email}
                            </Col>
                            <Col className="mb-2 text-muted fs-6" xs={{offset:2 , span:4}}>
                            {getCreationDate(feedbackData.created_at)}
                            </Col>
                        </Row>
                    </Card.Subtitle>
                    <Card.Text>
                        {feedbackData.comment}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
     );
}
 
export default FeedbackCard;