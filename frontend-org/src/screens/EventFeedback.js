import { Button } from "react-bootstrap";
import FeedbackCard from "../components/Feedback/FeedbackCard";

import Dropdown from 'react-bootstrap/Dropdown';
import { Col, Container, Row } from "react-bootstrap";

import { useState, useEffect } from 'react';
import {getParticipantApi} from '../api/axiosHook'
import { useParams } from 'react-router-dom';


const EventFeedback = () => {

    const [loading, setLoading] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);
    const [sorted, setSorted] = useState([]);

    const { eventId } = useParams();

    useEffect(() => {

        async function fetchEventFeedbacks(){
            const res = await getParticipantApi(localStorage.getItem('token')).get(`/event/${eventId}/feedbacks`)
            console.log(res.data)
            setFeedbacks([...res.data])
            setSorted([...res.data])
        }

        if(loading == false){
            setLoading(true)
            fetchEventFeedbacks()
        }

    }, [loading, feedbacks])


    const handleSort = (sortBy) => {
        let newarr = feedbacks

        if(sortBy == 'rating'){

            newarr.sort((a,b)=>{
                if(a.rating > b.rating){
                    return -1
                }
                if(a.rating < b.rating){
                    return 1
                }
                return 0
            })
            setSorted([...newarr])
        }

        else if(sortBy == "oldest"){

            newarr.sort((a,b)=>{
                if(new Date(a.created_at).getTime() < new Date(b.created_at).getTime()){
                    return -1
                }
                if(new Date(a.created_at).getTime() > new Date(b.created_at).getTime()){
                    return 1
                }
                return 0
            })
            setSorted([...newarr])
        }

        else if(sortBy == "newest"){

            newarr.sort((a,b)=>{
                if(new Date(a.created_at).getTime() > new Date(b.created_at).getTime()){
                    return -1
                }
                if(new Date(a.created_at).getTime() < new Date(b.created_at).getTime()){
                    return 1
                }
                return 0
            })

            console.log('sorting', newarr)
            setSorted([...newarr])
        }
    }

    return ( 
        <>

            <div style={{marginBottom: '60px'}} />

            <div style={{
                marginLeft: '15%'
            }}>  
                <Container style={{ marginBottom:'2rem'}}>
                    <Row style={{alignItems:'center'}}>

                        <Col xs={{offset:8, span:2}}>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Sort By
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>handleSort("rating")}>Rating</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>handleSort("newest")}>Newest</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>handleSort("oldest")}>Oldest</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    
                    </Row>
                </Container>

                <div style={{marginBottom: '40px'}} />

                {
                    sorted.length > 0 ? sorted.map((feedback, index)=>{
                        return(
                            <FeedbackCard 
                                key={index}
                                feedbackData={feedback}
                            />
                        )
                    }) : (
                        <></>
                    )
                }
            

            </div>
        </>
     );
}
 
export default EventFeedback;