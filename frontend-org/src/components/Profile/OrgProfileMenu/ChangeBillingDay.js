import PopupModal from '../../../components/PopupModal';
import { Button } from "react-bootstrap";
import { useState } from "react";

import { Stack } from "react-bootstrap";

import FormInput from "../../Form/FormInput";
import FormSelect from "../../Form/FormSelect";

import Form from 'react-bootstrap/Form';

const ChangeBillingDay = () => {

    const [changeBillingModalShow, setChangeBillingModalShow] = useState(false);

    const [question, setQuestion] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setChangeBillingModalShow(false);
        
        console.log(question);
    }

    let eventTypeOptions = [
        {
            'id': 1,
            'name': 'Offline'
        },
        {
            'id': 2,
            'name': 'Online'
        }
    ]

    const billingDayJSX = (
        <Stack gap={4}>
            <div>
                <FormInput 
                    label="Current Billing Day"
                    type="text"
                    placeholder="Enter question text"
                    backgroundColor={'#e5e5e5'}
                    value="12th"
                    onChange={setQuestion}
                    isDisabled={true}
                />

                <FormSelect id="billing-day"
                    label="New Billing Day"
                    options={eventTypeOptions}
                    defaultValue={eventTypeOptions[0].name}
                />
                    <h3>This dropdown is not working.</h3>
            </div>

        </Stack>

    )

    return ( 
        <>
            <p onClick={ () =>setChangeBillingModalShow(true)}
                style={{cursor: 'pointer', color:"#0d6efd"}}
            >
                 Change billing day
            </p>    

            <PopupModal
                show={changeBillingModalShow}
                onHide={() => setChangeBillingModalShow(false)}
                header="Change Billing Day"
                // bodyComponent={<Poll onHide={() => setPollModalShow(false)}/>}
                bodyComponent={billingDayJSX}
                size="lg"
                saveButtonText={"Save"}
                saveButtonAction={handleSubmit}
            />

        </>

     );
}
 
export default ChangeBillingDay;