import PopupModal from "../../PopupModal";

import Stack from 'react-bootstrap/Stack';
import FormInput from '../../Form/FormInput';
import { Button } from 'react-bootstrap';

import React, { useState } from 'react';
import QuizAnswer from './QuizAnswer';
import Carousel from "./Carousel";
import {getNewsfeedApi} from '../../../api/axiosHook'
import { useParams } from "react-router-dom";




const QuizModal = ({setAllPosts}) => {
    const { eventId } = useParams();

    const [quizModalShow, setQuizModalShow] = useState(false);
    const [question, setQuestion] = useState('');
    const [answerList, setAnswerList] = useState([{answer:'', radioValue:'1'}]);

    const [quizTopic, setQuizTopic] = useState('');

    const [quizset, setQuizset] = useState([{question:'', answerList:[{answer:'', radioValue:'1'}]}]);
    // console.log(quizset[0].question)
    // console.log(quizset[0].answerList)

    const handleSubmit = (e) => {
        e.preventDefault();
        

        for(let i = 0; i < quizset.length; i++){
            if(quizset[i].question === ''){
                alert(`Please don\'t leave question ${i+1} empty`)
                return;
            }
            if(quizset[i].answerList.length === 0){
                alert('Please enter at least one option for each question')
                return;
            }

            let incorrect=0;
            for(let j = 0; j < quizset[i].answerList.length; j++){
                
                if(quizset[i].answerList[j].answer === ''){
                    alert(`Please don\'t leave any option blank for question ${i+1}`)
                    return;
                }
                if(quizset[i].answerList[j].radioValue==='1'){
                    incorrect++
                }
            }

            if(incorrect === quizset[i].answerList.length){
                alert(`Please select at least one answer as correct in question ${i+1}`)
                return;
            }
        }   

        setQuizModalShow(false);

        

        let questions = [];

        quizset.forEach(quiz => {
            questions.push({
                question: quiz.question,
                answers: []
            })
            quiz.answerList.forEach(answer => {
                questions[questions.length-1].answers.push({
                    answer: answer.answer,
                    is_correct: answer.radioValue === '1'? false : true
                })
            })
        })

        const newPost = {
            image: '',
            poll_options: [],
            questions: questions,
            content: quizTopic,
        }


        console.log(newPost)
        setQuizset([{question:'', answerList:[{answer:'', radioValue:'1'}]}])
        setQuizTopic('')

        getNewsfeedApi(localStorage.getItem('token')).post(`${eventId}/post`, newPost).then((res)=>{
            console.log(res.data)
            setAllPosts(allPosts => [...allPosts, res.data.post])
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    const quizJSX = (
        <Stack gap={5}>
            <div>
                <FormInput 
                    label="Question"
                    type="text"
                    placeholder="Enter question text"
                    backgroundColor={'#e5e5e5'}
                    value={question}
                    onChange={setQuestion}
                />
            </div>

            <div style={{marginBottom: '10px'}}>
                <QuizAnswer answerList={answerList} setAnswerList={setAnswerList}/>
            </div>
            
        </Stack>
    )

    return ( 
        <>
            <Button variant="contained" color="primary" onClick={ () => setQuizModalShow(true)}> Add quiz</Button>

            <PopupModal
                show={quizModalShow}
                onHide={() => setQuizModalShow(false)}
                header="New Quiz"
                bodyComponent={
                    <Carousel 
                        quizset={quizset}
                        setQuizset={setQuizset}
                        quizTopic={quizTopic}
                        setQuizTopic={setQuizTopic}
                    />
                    
                }
                size="xl"
                saveButtonText={"Add Quiz"}
                saveButtonAction={handleSubmit}
            />

        </>

     );
}
 
export default QuizModal;