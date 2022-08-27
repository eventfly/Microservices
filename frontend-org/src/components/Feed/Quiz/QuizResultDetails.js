import QuizResultSummary from "./QuizResultSummary";
import QuizResultIndividual from "./QuizResultIndividual";
import { useState } from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'

import Dropdown from 'react-bootstrap/Dropdown';
import Leaderboard from "./Leaderboard";

const QuizResultDetails = () => {

    const questions = []
    for (let i = 0; i < 3; i++) {
        questions.push('summary')
    }

    const [viewType, setViewType] = useState([...questions])
    const [showLeaderboard, setShowLeaderboard] = useState(false)

    const viewBy = (type, index) => {
        let newArr = [...viewType]
        newArr[index] = type
        setViewType(newArr)
    }

    return ( 
        <>
            <div className="d-flex justify-content-between my-4">
                <Col>
                    <Row>
                        <h3>
                            Quiztopic
                        </h3>
                        </Row>
                        <Row>
                        <h6 className="text-muted">
                            26 august 2022
                        </h6>
                    </Row>
                </Col>

                <div onClick={() => setShowLeaderboard(true)}>
                    {
                        showLeaderboard===false ? 
                            <Button>Click To View Leaderboard</Button> : null
                    }
                </div>
            </div>
            <div className='feed-container'>
                {
                    showLeaderboard==true ? <Leaderboard setShowLeaderboard={setShowLeaderboard}/> : 
                    (
                        
                            questions.map((question, index) => {
                                return (
                                    
                                        <div className="quiz-result-single-container" key={index}> 
                                            <Container>
                                                <Row>
                                                    <Col>
                                                        <Row>
                                                        <h3>
                                                            Question {index + 1}
                                                        </h3>
                                                        </Row>
                                                        <Row>
                                                        <h6 className="text-muted">
                                                            Correct: corAns
                                                        </h6>
                                                        </Row>
                                                    </Col>
                                                    <Col xs={{offset:5}}>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                View By
                                                            </Dropdown.Toggle>
        
                                                            <Dropdown.Menu>
                                                                <div className="feed-dropdown-item" onClick={() => viewBy('summary',index)}> <Button variant="contained" color="primary">Summary</Button> </div>  
                                                                <div className="feed-dropdown-item" onClick={() => viewBy('individual',index)}> <Button variant="contained" color="primary">Individual</Button> </div> 
                                                            </Dropdown.Menu>
                                                        </Dropdown> 
                                                    </Col>
                                                </Row>
                                            </Container>
                                            {
                                                viewType[index] === 'summary' ? <QuizResultSummary /> : <QuizResultIndividual />
                                            }
                                            
                                        </div>       
                                                  
                                )
                            })
                        
                    )
                }
                
            </div>
        </>
     );
}
 
export default QuizResultDetails;