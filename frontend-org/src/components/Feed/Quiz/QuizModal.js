import PopupModal from "../../PopupModal";

import Stack from 'react-bootstrap/Stack';
import FormInput from '../../Form/FormInput';
import { Button } from 'react-bootstrap';

import React, { useState } from 'react';
import QuizAnswer from './QuizAnswer';
import Carousel from "./Carousel";
import SubscriptionModal from "../../Subscription/SubscriptionModal";




const QuizModal = () => {

    const [quizModalShow, setQuizModalShow] = useState(false);
    const [question, setQuestion] = useState('');
    const [answerList, setAnswerList] = useState([{answer:'', radioValue:'1'}]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newQuiz = {
            question: question,
            answerList: answerList
        }
        console.log(newQuiz);
        let incorrect=0;
        for(let i = 0; i < answerList.length; i++){
            if(answerList[i].radioValue==='1'){
                incorrect++
            }
        }
        if (incorrect === answerList.length){
            alert('Please select at least one answer as correct')
        } else {
            setQuizModalShow(false);
        }
    }

    const quizjsx = (
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
                    <Carousel bodyComponent={quizjsx}
                    />
                }
                size="lg"
                saveButtonText={"Add Quiz"}
                saveButtonAction={handleSubmit}
            />

        </>

     );
}
 
export default QuizModal;