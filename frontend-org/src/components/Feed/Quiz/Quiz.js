import Stack from 'react-bootstrap/Stack';
import FormInput from '../../Form/FormInput';
import { Button } from 'react-bootstrap';

import React, { useState } from 'react';
import QuizAnswer from './QuizAnswer';


const Quiz = ({index, quizset, setQuizset}) => {
    // const [question, setQuestion] = useState('');
    // const [answerList, setAnswerList] = useState([{answer:'', radioValue:'1'}]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const newQuiz = {
    //         question: question,
    //         answerList: answerList
    //     }
    //     console.log(newQuiz);
    //     let incorrect=0;
    //     for(let i = 0; i < answerList.length; i++){
    //         if(answerList[i].radioValue==='1'){
    //             incorrect++
    //         }
    //     }
    //     if (incorrect === answerList.length){
    //         alert('Please select at least one answer as correct')
    //     } else {
    //         onHide();
    //     }
    // }
    const updateQuestion = (value) => {
        let newQuizset = [...quizset];
        newQuizset[index].question = value;
        setQuizset(newQuizset);
    }
    
    const updateAnswerList = (value) => {
        let newQuizset = [...quizset];
        newQuizset[index].answerList = value;
        setQuizset(newQuizset);
    }

    // console.log(typeof quizset[index].answerList)
    // console.log(quizset[index].answerList)

    // console.log(typeof quizset[index])
    // console.log(quizset[index])

    // console.log(typeof quizset)
    // console.log(quizset)


    return ( 
        <Stack gap={5}>
            <div>
                <FormInput 
                    label={`Question ${index+1}`}
                    type="text"setQuizset
                    placeholder="Enter question text"
                    backgroundColor={'#e5e5e5'}
                    value={quizset[index].question}
                    onChange={updateQuestion}
                />
            </div>

            <div style={{marginBottom: '10px'}}>
                <QuizAnswer 
                    quizIndex = {index}
                    answerList={quizset[index].answerList}
                    setAnswerList={updateAnswerList}
                />
            </div>
            
        </Stack>
     );
}
 
export default Quiz;