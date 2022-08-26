import PopupModal from "../PopupModal";
import { Button, FormText } from "react-bootstrap";


import FormSelect from "../Form/FormSelect";
import FormInput from "../Form/FormInput";
import AutoComplete from "../AutoComplete";
import FormButton from "../Form/FormButton";

import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
import {getEventApi} from '../../api/axiosHook'

const TicketModal = ({setEvent}) => {

    const [ticketModalShow, setTicketModalShow] = useState(false);

    const [ticketPrice, setTicketPrice] = useState(0);
    const [ticketClass, setTicketClass] = useState('General');
    const [quantity, setQuantity] = useState(0);
    const [tokens, setTokens] = useState([]);

    const { eventId } = useParams();

    const [tokenOptions, setTokenOptions] = useState(['Food', 'T-Shirt', 'Bag', 'VIP Seat'])


    let ticketClassOptions = [
        {
            'id': 1,
            'name': 'General'
        },
        {
            'id': 2,
            'name': 'Business'
        },
        {
            'id': 3,
            'name': 'Premium'
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setTicketModalShow(false)

        let ticket = {
            class: ticketClass,
            price: ticketPrice,
            quantity: quantity,
            tokens: tokens
        }

        let tickets =[ticket]

        console.log(ticket)
        console.log("event id: ", eventId)

        getEventApi(localStorage.getItem('token')).post(`/${eventId}/ticket`, {tickets})
        .then(res => {
            console.log(res.data.event)
            setEvent(res.data.event)
            alert("Ticket added")

        }).catch(err => {
            console.log(err)
        })
    }

    const ticketJSX = (
        <>
            <form onSubmit={handleSubmit} className="tickets-form-body">

                <FormSelect id="TicketClass"
                    label="TicketClass"
                    options={ticketClassOptions}
                    onChange={setTicketClass}
                />

                <div style={{marginBottom: '40px'}}></div>

                <FormInput id="ticket"
                    inputType="number"
                    label="Ticket Price(BDT)"
                    placeholder="Enter Price"
                    value={ticketPrice}
                    onChange={setTicketPrice}
                />

                <div style={{marginBottom: '40px'}}></div>

                <FormInput id="quantity"
                    inputType="number"
                    label="Quantity"
                    placeholder="No. of tickets"
                    value={quantity}
                    onChange={setQuantity}
                />

                <div style={{marginBottom: '40px'}}></div>

                <AutoComplete
                    label={'Tokens'}
                    placeholder={'Choose several tokens'}
                    options={tokenOptions}
                    setOptions={setTokenOptions}
                    multiSelections={tokens}
                    setMultiSelections={setTokens}
                />

                <div style={{marginBottom: '10px'}}></div>

                <FormButton 
                    type="submit" 
                    buttonText="Submit"
                    bgColor={'#009F02'}
                />

            </form>
        </>

    )

    return ( 
        <>
            <Button variant="primary" onClick={ () => setTicketModalShow(true)}>+ Issue Ticket</Button>    

            <PopupModal
                show={ticketModalShow}
                onHide={() => setTicketModalShow(false)}
                header="Issue Ticket"
                bodyComponent={ticketJSX}
                size="lg"
                saveButtonText={"Add Ticket"}
                saveButtonAction={handleSubmit}
            />

        </>

     );
}
 
export default TicketModal;