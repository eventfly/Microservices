import FormTitle from "../../Form/FormTitle";
import {ListGroup} from 'react-bootstrap';
import SubPackage from "../../Subscription/SubPackage";
import {Link} from 'react-router-dom';

import ChangeBillingDay from './ChangeBillingDay';

const Package = () => {
    return ( 
        <>
            <FormTitle title="Package" />
            <div className="profile_flexbox">

                <div className="left-column">
                    
                    <> You're currently subscribed to</>
                    <SubPackage headerColor={'navy'} isBuyOptionAvailable={false} />

                    <Link to='/sub'>
                        {/* <Button variant="primary"  block style={{
                            backgroundColor:'white',
                            color:'blue',
                            border:'none'
                        }}> */}
                            Browser More Packages
                        {/* </Button> */}
                    </Link>

                </div>

                <div className="right-column">
                    <ListGroup variant="flush">
                        <ListGroup.Item><Link to='/'>Manage payment info</Link></ListGroup.Item>
                        <ListGroup.Item><Link to='/'>Add backup payment method</Link></ListGroup.Item>
                        <ListGroup.Item><Link to='/profile/billing'>Billing details</Link></ListGroup.Item>
                        <ListGroup.Item><ChangeBillingDay /></ListGroup.Item>
                    </ListGroup>
                </div>
           </div> 
        </>
    );
}
 
export default Package;