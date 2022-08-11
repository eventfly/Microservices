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

    const [quizset, setQuizset] = useState([{question:'', answerList:[{answer:'', radioValue:'1'}]}]);
    // console.log(quizset[0].question)
    // console.log(quizset[0].answerList)

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log(quizset)

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
                    <Carousel quizset={quizset} setQuizset={setQuizset}/>
                    
                }
                size="xl"
                saveButtonText={"Add Quiz"}
                saveButtonAction={handleSubmit}
            />

        </>

     );
}
 
export default QuizModal;