import FormTitle from "../components/Form/FormTitle";
import FormSelect from "../components/Form/FormSelect";
import FormInput from "../components/Form/FormInput";
import FormButton from "../components/Form/FormButton";
import AutoComplete from "../components/AutoComplete";
import {getEventApi} from '../api/axiosHook'

import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'

const EventTicket = ({setEvent}) => {

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

        }).catch(err => {
            console.log(err)
        })
    }


    return ( 

        <>

            {/* <FormTitle title="Issue Tickets" /> */}
            <h2 className="tickets-form-title"> Issue Tickets </h2>

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


    );
}
 
export default EventTicket;