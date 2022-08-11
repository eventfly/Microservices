import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col';

const EventThumbnail = ({image, title}) => {
    return ( 

        <>
            <div className="event-thumbnail">

                <Col xs={2} md={2} lg={2}>
                    <Image 
                        src={image} 
                        thumbnail={true}
                        width={'65%'}
                        roundedCircle={true}
                        fluid={true}
                        className="thumbnail-image-style"
                    />
                </Col>

                <h3 className='thumbnail-title'> {title} </h3>

            </div>
        
        </>

    );
}
 
export default EventThumbnail;