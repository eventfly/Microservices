import PopupModal from '../../../components/PopupModal';
import { Button } from "react-bootstrap";
import { useState } from "react";

import { Stack } from "react-bootstrap";

import FormInput from "../../Form/FormInput";
import FormSelect from "../../Form/FormSelect";

import Form from 'react-bootstrap/Form';

const ChangeBillingDay = () => {

    const [changeBillingModalShow, setChangeBillingModalShow] = useState(false);

    const [newBillingDay, setNewBillingDay] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setChangeBillingModalShow(false);
        
        console.log(newBillingDay);
        console.log(newBillingDay.length ===3? newBillingDay.substring(0,1) : newBillingDay.substring(0,2));
    }

    let billingDayOptions = []
    for(let i = 1; i <= 28; i++){
        let ordinal = (i==1)? 'st' : (i==2)? 'nd' : (i==3)? 'rd' : 'th'
        billingDayOptions.push({
            'id': i,
            'name': `${i}${ordinal}`
        })
    }

    const billingDayJSX = (
        <Stack gap={4}>
            <div>
                <FormInput 
                    label="Current Billing Day"
                    type="text"
                    placeholder="Enter question text"
                    backgroundColor={'#e5e5e5'}
                    value="12th"
                    isDisabled={true}
                />

                <FormSelect id="billing-day"
                    label="New Billing Day"
                    options={billingDayOptions}
                    defaultValue={newBillingDay}
                    onChange={setNewBillingDay}
                />
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