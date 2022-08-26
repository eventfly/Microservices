import PopupModal from "../PopupModal";
import { Button, FormText } from "react-bootstrap";


import FormSelect from "../Form/FormSelect";
import FormInput from "../Form/FormInput";
import AutoComplete from "../AutoComplete";
import FormButton from "../Form/FormButton";

import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
import {getEventApi} from '../../api/axiosHook'

const TicketModal = ({setEvent, existedClasses, setEventTicketLoading}) => {

    const [ticketModalShow, setTicketModalShow] = useState(false);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [tokens, setTokens] = useState([]);

    const { eventId } = useParams();

    const [tokenOptions, setTokenOptions] = useState(['Food', 'T-Shirt', 'Bag', 'VIP Seat'])

    const [newClassOptions, setNewClassOptions] = useState([]);
    const [newClass, setNewClass] = useState([]);
    const [loading, setLoading] = useState(false);

    let ticketClassOptions = ['General', 'Business', 'Premium']


    useEffect(()=>{

        if(loading == false){
            setLoading(true)
            setNewClassOptions([...ticketClassOptions])
        }

    }, [loading, newClassOptions])

    const handleSubmit = (e) => {
        e.preventDefault()

        let tickets = [{
            class: newClass[0],
            price: ticketPrice,
            quantity: quantity,
            tokens: tokens
        }]

        console.log(tickets)

        let existedTickets = existedClasses.filter((item)=>{
            return item.class == tickets[0].class
        })

        if(existedTickets.length != 0){
            alert("Your selected ticket class already exists")
        }

        else{

            getEventApi(localStorage.getItem('token')).post(`/${eventId}/ticket`, {tickets})
            .then(res => {

                setTicketModalShow(false)
                console.log(res.data.event)
                setEvent(res.data.event)
                setEventTicketLoading(false)

            }).catch(err => {
                console.log(err)
            })
        }
    }

    const ticketJSX = (
        <>
            <form onSubmit={handleSubmit} className="tickets-form-body">

                {/* <FormSelect id="TicketClass"
                    label="TicketClass"
                    options={ticketClassOptions}
                    onChange={setTicketClass}
                /> */}

                <AutoComplete
                    label={'Ticket Class'}
                    placeholder={'Choose a class'}
                    options={newClassOptions ? newClassOptions: []}
                    setOptions={setNewClassOptions}
                    multiSelections={newClass}
                    setMultiSelections={setNewClass}
                    isNewItemsAllowed={true}
                    isMultiple={false} 
                />

                <div style={{marginBottom: '30px'}}></div>

                <FormInput id="ticket"
                    inputType="number"
                    label="Ticket Price(BDT)"
                    placeholder="Enter Price"
                    value={ticketPrice}
                    onChange={setTicketPrice}
                />

                <div style={{marginBottom: '30px'}}></div>

                <FormInput id="quantity"
                    inputType="number"
                    label="Quantity"
                    placeholder="No. of tickets"
                    value={quantity}
                    onChange={setQuantity}
                />

                <div style={{marginBottom: '30px'}}></div>

                <AutoComplete
                    label={'Tokens'}
                    placeholder={'Choose several tokens'}
                    options={tokenOptions}
                    setOptions={setTokenOptions}
                    multiSelections={tokens}
                    setMultiSelections={setTokens}
                    isNewItemsAllowed={true}
                    isMultiple={true} 
                />

                <div style={{marginBottom: '30px'}}></div>

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