import QuizResultSummary from "./QuizResultSummary";
import QuizResultIndividual from "./QuizResultIndividual";
import { useState } from "react";
import {Container, Row, Col} from 'react-bootstrap';

import Dropdown from 'react-bootstrap/Dropdown';

const QuizResultDetails = () => {

    const questions = []
    for (let i = 0; i < 3; i++) {
        questions.push('summary')
    }

    const [viewType, setViewType] = useState([...questions])

    const viewBy = (type, index) => {
        let newArr = [...viewType]
        newArr[index] = type
        setViewType(newArr)
    }

    return ( 
        <>
            <div className='feed-container'>
                {
                    questions.map((question, index) => {
                        return (
                            
                                <div className="quiz-result-single-container" key={index}> 
                                    <Container>
                                        <Row>
                                            <Col>
                                                <h4>
                                                    Question {index + 1}
                                                </h4>
                                            </Col>
                                            <Col>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        View By
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <div className="feed-dropdown-item" onClick={() => viewBy('summary',index)}> Summary </div>  
                                                        <div className="feed-dropdown-item" onClick={() => viewBy('individual',index)}> Individual </div> 
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
                }
                
            </div>
        </>
     );
}
 
export default QuizResultDetails;