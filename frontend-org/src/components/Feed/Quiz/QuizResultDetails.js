import QuizResultSummary from "./QuizResultSummary";
import QuizResultIndividual from "./QuizResultIndividual";
import { useState,useEffect } from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import {useLocation} from 'react-router-dom'

import { getNewsfeedApi } from "../../../api/axiosHook";

import Dropdown from 'react-bootstrap/Dropdown';
import Leaderboard from "./Leaderboard";

const QuizResultDetails = () => {


    const location = useLocation()
    const { quizTopic, post_id } = location.state
    console.log(post_id)

    const [questions, setQuestions] = useState([])

    const [viewType, setViewType] = useState([...questions])
    const [showLeaderboard, setShowLeaderboard] = useState(false)

    const viewBy = (type, index) => {
        let newArr = [...viewType]
        newArr[index] = type
        setViewType(newArr)
    }

    const [loading, setLoading] = useState(false);

    useEffect(() =>{

        async function fetchQuizData(){

            if(loading == false){
                    getNewsfeedApi(localStorage.getItem('token')).get(`post/${post_id.post_id}`).then((res)=>{
                        console.log(res)
                        setQuestions([...res.data.post.questions])
                    })
                    .catch((err)=>{
                        console.log(err.response.data.errors)
                    })

                    setLoading(true)
                }
            }
      

        fetchQuizData()


    }, [loading])

    const [Correct, setCorrect] = useState('')

    return ( 
        <>
            <div className="d-flex justify-content-between my-4">
                <Col>
                    <Row>
                        <h3>
                            {quizTopic.quizTopic}
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
                            // <Button>Click To View Leaderboard</Button> : null
                            null:null
                    }
                </div>
            </div>
            <div className='feed-container'>
                {
                    showLeaderboard==true ? <Leaderboard setShowLeaderboard={setShowLeaderboard}/> : 
                    (
                        
                            questions && questions.map((question, index) => {
                                // setCorrect(question.answers.filter(answer => answer.is_correct === true)[0].answer)
                                return (

                                        <div className="quiz-result-single-container" key={index}> 
                                            <Container>
                                                <Row>
                                                    <Col>
                                                        <Row>
                                                        <h3>
                                                            Question {index + 1}
                                                            {/* {question.question} */}
                                                        </h3>
                                                        </Row>
                                                        <Row>
                                                        <h6 className="text-muted">
                                                            {/* {question.question} */}
                                                        </h6>
                                                        </Row>
                                                    </Col>
                                                    {/* <Col xs={{offset:5}}>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                View By
                                                            </Dropdown.Toggle>
        
                                                            <Dropdown.Menu>
                                                                <div className="feed-dropdown-item" onClick={() => viewBy('summary',index)}> <Button variant="contained" color="primary">Summary</Button> </div>  
                                                                <div className="feed-dropdown-item" onClick={() => viewBy('individual',index)}> <Button variant="contained" color="primary">Individual</Button> </div> 
                                                            </Dropdown.Menu>
                                                        </Dropdown> 
                                                    </Col> */}
                                                </Row>
                                            </Container>
                                            {
                                                // viewType[index] === 'summary' ? <QuizResultSummary /> : <QuizResultIndividual />
                                                <QuizResultSummary question={question} />
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