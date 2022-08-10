import {Card} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';

const EventThumbnail = ({image, title}) => {
    return ( 

        <>
            <div className="event-thumbnail">

                <Col xs={2} md={2} lg={2}>
                    <Image 
                        src={image} 
                        thumbnail={true}
                        width={'70%'}
                        responsive
                        roundedCircle={true}
                        fluid={true}
                        className="thumbnail-image-style"
                    />
                </Col>


                {/* <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src={image}
                        roundedCircle={true}
                    />
                </Figure> */}


                <h3 className='thumbnail-title'> {title} </h3>

            </div>
        
        </>

    );
}
 
export default EventThumbnail;