import QuizResultSummary from "./QuizResultSummary";
import QuizResultIndividual from "./QuizResultIndividual";
import { useState } from "react";

import Dropdown from 'react-bootstrap/Dropdown';

const QuizResultDetails = () => {

    const questions = []
    for (let i = 0; i < 3; i++) {
        questions.push(i)
    }

    const [viewType, setViewType] = useState('summary') 

    const viewBy = (type) => {
        if(type === 'summary') {
            setViewType('summary')
        }
        else if(type === 'individual') {
            setViewType('individual')
        }

    }

    return ( 
        <>
            <div className='feed-container'>
                {
                    questions.map((question, index) => {
                        return (
                            
                                <div className="quiz-result-single-container" key={index}> 
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            View By
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <div className="feed-dropdown-item" onClick={() => viewBy('summary')}> Summary </div>  
                                            <div className="feed-dropdown-item" onClick={() => viewBy('individual')}> Individual </div> 
                                        </Dropdown.Menu>
                                    </Dropdown> 
                                    <h3>
                                        Question {index + 1}
                                    </h3>
                                    {
                                        viewType === 'summary' ? <QuizResultSummary /> : <QuizResultIndividual />
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