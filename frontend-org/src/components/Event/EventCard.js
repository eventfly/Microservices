import '../../styles/EventCard.css'
// import { Link } from "react-router-dom";
import {Card} from 'react-bootstrap';

const EventCard = ({name, description, startDate, endDate, banner}) => {
    return ( 

        <>

            <Card className="bg-dark text-white eventCard">

                <Card.Img src={banner} alt="Card image" className="eventBanner" />

                <Card.ImgOverlay className="overlay">
                    <Card.Text className="event-card-date"> 
                        {startDate.split('T')[0]} {startDate.split('T')[1]} - 
                        {endDate.split('T')[0]} {endDate.split('T')[1]} 
                    </Card.Text>
                    
                    <Card.Title className="event-card-title">{name}</Card.Title>
                    
                    
                    <Card.Text className="event-card-description">
                        {description}
                    </Card.Text>
                </Card.ImgOverlay>
            
            </Card>

        </>

    );
}
 
export default EventCard;