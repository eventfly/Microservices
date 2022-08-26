import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import {useState} from 'react';

import FormInput from '../Form/FormInput';
import PopupModal from '../PopupModal';
import {getOrgApi, getPaymentApi} from '../../api/axiosHook'



const SubscriptionModal = ({pkgData}) => {

    //useState for modal
    const [modalShow, setModalShow] = useState(false);

    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');

    const handleBuy = () => {
        console.log('bought');

        if(pkgData){

            getOrgApi(localStorage.getItem('token')).post('/order', {package_id: pkgData._id}).then((res)=>{
                console.log(res.data.order)

                let order = res.data.order


                getPaymentApi(localStorage.getItem('token')).post('/org', {
                    token: 'tok_visa',
                    order_id: order._id
                })
                .then((res)=>{
                    console.log(res.data)

                    setModalShow(false)
        
                }).catch((err)=>{
                    alert('Your stripe token is invalid')
                    console.log(err)
                })


            }).catch((err)=>{
                console.log(err)
                alert('Your order is failed')
            })
        }
        
        else{
            console.log('package id null')
        }
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
                <ListGroup.Item> <strong> Package Price: </strong> {pkgData.price} </ListGroup.Item>
                <ListGroup.Item><strong>Discount: </strong> 0 </ListGroup.Item>
                <ListGroup.Item><strong>Total: </strong> {pkgData.price} </ListGroup.Item>

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
                saveButtonAction={handleBuy}
            />

        </>

    )
}
 
export default SubscriptionModal;