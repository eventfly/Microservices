import { Stack } from "react-bootstrap";
import PollChoice from "./PollChoice";

import {useState} from 'react';
import FormInput from "../../Form/FormInput";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Poll = ({onHide}) => {

    const [question, setQuestion] = useState('');
    const [choiceList, setChoiceList] = useState([{choice:''}]);
    const [allowMultiple, setAllowMultiple] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        onHide();
        const newPoll = {
            question: question,
            choiceList: choiceList,
            allowMultiple: allowMultiple
        }
        console.log(newPoll);
    }

    return ( 
        <Stack gap={4}>
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
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Allow choosing multiple answers"
                    onChange={(e) => setAllowMultiple(e.target.checked)}
                    value={true}
                />
            </div>

            <div style={{marginBottom: '10px'}}>
                <PollChoice choiceList={choiceList} setChoiceList={setChoiceList}/>
            </div>

            <div>
                <Button variant="primary" onClick={handleSubmit}>tempbutton</Button>
                    </div>
            
        </Stack>
     );
}
 
export default Poll;