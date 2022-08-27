import Card from 'react-bootstrap/Card';

const StatCard = ({header, body}) => {
    return ( 
        <Card>
            <Card.Body className='d-flex flex-column align-items-center '>
                <Card.Subtitle className="mb-2"><strong>{header}</strong></Card.Subtitle>
                <Card.Text className="h3">
                {body}
                </Card.Text>
            </Card.Body>
        </Card>
     );
}
 
export default StatCard;