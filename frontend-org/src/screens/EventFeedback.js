import { Button } from "react-bootstrap";
import FeedbackCard from "../components/Feedback/FeedbackCard";

import Dropdown from 'react-bootstrap/Dropdown';
import { Col, Container, Row } from "react-bootstrap";


const EventFeedback = () => {
    const handleSort = (sortBy) => {
        if(sortBy == "rating"){
            console.log('rating')
        }
        else if(sortBy == "oldest"){
            console.log('oldest')
        }
        else if(sortBy == "newest"){
            console.log('newest')
        }
    }

    return ( 
        <>  
            <Container style={{ marginBottom:'2rem'}}>
                <Row style={{alignItems:'center'}}>

                    <Col xs={{offset:8, span:2}}>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Sort By
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>handleSort("rating")}>Rating</Dropdown.Item>
                                <Dropdown.Item onClick={()=>handleSort("newest")} >Newest</Dropdown.Item>
                                <Dropdown.Item onClick={()=>handleSort("oldest")}>Oldest</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                
                </Row>
            </Container>

            <FeedbackCard />
            <FeedbackCard />
            <FeedbackCard />

            
        </>
     );
}
 
export default EventFeedback;