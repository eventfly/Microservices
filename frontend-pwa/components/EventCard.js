import styles from '../styles/EventCard.module.css'
import Link from 'next/link'
import {Card} from 'react-bootstrap';

const EventCard = ({event}) => {
    return ( 

        <>

            <Card className={"bg-dark text-white " + styles.eventCard}
            >

                <Card.Img src={event.image} alt="Card image" className={styles.eventBanner} />

                <Card.ImgOverlay className={styles.overlay}>
                    <Card.Text className={styles.date}> {event.date} </Card.Text>
                    
                    <Link href={"/event/" + event.url}>
                    <Card.Title className={styles.title}>{event.title}</Card.Title>
                    </Link>
                    
                    
                    <Card.Text className={styles.description}>
                        {event.description}
                    </Card.Text>
                </Card.ImgOverlay>
            
            </Card>

        </>

    );
}
 
export default EventCard;