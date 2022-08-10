import PopupModal from "../../PopupModal";
import { Button } from "react-bootstrap";
import { useState } from "react";

import { Stack } from "react-bootstrap";
import PollChoice from "./PollChoice";

import FormInput from "../../Form/FormInput";

import Form from 'react-bootstrap/Form';

const PollModal = () => {

    const [pollModalShow, setPollModalShow] = useState(false);

    const [question, setQuestion] = useState('');
    const [choiceList, setChoiceList] = useState([{choice:''}]);
    const [allowMultiple, setAllowMultiple] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setPollModalShow(false);
        const newPoll = {
            question: question,
            choiceList: choiceList,
            allowMultiple: allowMultiple
        }
        console.log(newPoll);
    }

    const polljsx = (
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

            {/* <div>
                <Button variant="primary" onClick={handleSubmit}>tempbutton</Button>
                    </div> */}
            
        </Stack>

    )

    return ( 
        <>
            <Button variant="contained" color="primary" onClick={ () => setPollModalShow(true)}> Add poll</Button>    

            <PopupModal
                show={pollModalShow}
                onHide={() => setPollModalShow(false)}
                header="New Poll"
                // bodyComponent={<Poll onHide={() => setPollModalShow(false)}/>}
                bodyComponent={polljsx}
                size="lg"
                saveButtonText={"Add Poll"}
                saveButtonAction={handleSubmit}
            />

        </>

     );
}
 
export default PollModal;