import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import {useState} from 'react';

import FormInput from '../Form/FormInput';


const SubscriptionModal = () => {

    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');

    return (
        <Container className="p-3">
          <Row>
            <Col>
                <FormInput
                    label="Credit Card Number"
                    type="text"
                    placeholder="Enter credit card number"
                    bgColor={'#e5e5e5'}
                    value={creditCardNumber}
                    onChange={setCreditCardNumber}
                />

                <FormInput
                    label="Name on Card"
                    type="text"
                    placeholder="Enter name on card"
                    bgColor={'#e5e5e5'}
                    value={nameOnCard}
                    onChange={setNameOnCard}
                />
            </Col>
            <Col>
            <ListGroup >
                <ListGroup.Item active>Pricing Details</ListGroup.Item>
                <ListGroup.Item>Package Price: </ListGroup.Item>
                <ListGroup.Item>Discount: </ListGroup.Item>
                <ListGroup.Item>Total: </ListGroup.Item>
                <ListGroup.Item style={{textAlign:'center'}}>
                    <Button variant="success">Checkout</Button>
                </ListGroup.Item>
            </ListGroup>
            </Col>
          </Row>
        </Container>
    );
}
 
export default SubscriptionModal;