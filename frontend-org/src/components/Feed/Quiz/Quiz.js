import Stack from 'react-bootstrap/Stack';
import FormInput from '../../Form/FormInput';
import { Button } from 'react-bootstrap';

import React, { useState } from 'react';
import QuizAnswer from './QuizAnswer';


const Quiz = ({onHide, setQuiz}) => {
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
            onHide();
        }
    }
    

    return ( 
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

            <div>
                <QuizAnswer answerList={answerList} setAnswerList={setAnswerList}/>
            </div>

            <div style={{textAlign: 'center'}}>
                <Button variant="success" onClick={handleSubmit}>Add Quiz</Button>
            </div>
            
        </Stack>
     );
}
 
export default Quiz;