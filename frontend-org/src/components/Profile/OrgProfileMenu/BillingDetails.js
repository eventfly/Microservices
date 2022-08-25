import {Table, Accordion} from 'react-bootstrap';
import FormTitle from '../../Form/FormTitle';
const BillingDetails = () => {

    const events = []
    for(let i = 0; i < 10; i++){
        events.push(i)
    }

    return ( 
        <div className="profile">
            <FormTitle title="Billing Details" />
            <Accordion style={{margin:'3rem 1rem'}}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Your Plan</Accordion.Header>
                    <Accordion.Body>
                    <p>Gold Package</p>
                    <p>100 BDT/Month</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Next Billing Date</Accordion.Header>
                    <Accordion.Body>
                    12 September, 2022
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Table style ={{ textAlign: "center", margin:'3rem 1rem'}} striped bordered hover >
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Service Period</th>
                    <th>Payment Method</th>
                    <th>Subtotal</th>
                    <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                {
                    (
                        events.map(event =>{
                            console.log(event);
                            return (
                                <tr>
                                    <td>12/8/2022</td>
                                    <td>Gold Package</td>
                                    <td>12/8/2022 to 12/9/2022</td>
                                    <td>bKash</td>
                                    <td>100(+10 vat)</td>
                                    <td>110</td>
                                </tr>
        
                                );
                        })
                    ) 
                }
                </tbody>
            </Table>
        </div>
     );
}
 
export default BillingDetails;