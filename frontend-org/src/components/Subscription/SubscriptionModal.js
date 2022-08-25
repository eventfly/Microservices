import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import {useState} from 'react';

import FormInput from '../Form/FormInput';
import PopupModal from '../PopupModal';



const SubscriptionModal = () => {

    //useState for modal
    const [modalShow, setModalShow] = useState(false);

    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');

    const handleBuy = () => {
        console.log('bought');
    }

    const subscriptionJSX = (
        <Container className="p-3" style={{border:'none'}}>
          <Row>
            <Col xs={5}>
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
            <Col xs={{ span: 6, offset: 1 }}>
            <ListGroup >
                <ListGroup.Item active>Pricing Details</ListGroup.Item>
                <ListGroup.Item>Package Price: </ListGroup.Item>
                <ListGroup.Item>Discount: </ListGroup.Item>
                <ListGroup.Item>Total: </ListGroup.Item>
                {/* <ListGroup.Item style={{textAlign:'center'}}>
                    <Button variant="success">Checkout</Button>
                </ListGroup.Item> */}
            </ListGroup>
            </Col>
          </Row>
        </Container>
    );

    return (
        <>
            <Button variant="success" onClick={() => setModalShow(true)}>Buy Package</Button>

            <PopupModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                header="Buy Package"
                bodyComponent={subscriptionJSX}
                saveButtonText={"Checkout"}
                size="lg"
                saveBUttonAction={handleBuy}
            />

        </>

    )
}
 
export default SubscriptionModal;