import FormTitle from "../../Form/FormTitle";
import {ListGroup} from 'react-bootstrap';
import SubPackage from "../../Subscription/SubPackage";
import {Link} from 'react-router-dom';

import ChangeBillingDay from './ChangeBillingDay';

const OrgPackage = ({orgPackage}) => {
    return ( 
        <>
            <FormTitle title="Package" />
            <div className="profile_flexbox">

                <div className="left-column">
                    <div style={{marginBottom: '40px'}} />

                    <SubPackage 
                        headerColor={'navy'} 
                        isBuyOptionAvailable={false}
                        pkgData={orgPackage} 
                    />

                    <Link to='/subscription'>
                        Browser More Packages
                    </Link>

                </div>

                <div className="right-column">
                    <div style={{marginBottom: '40px'}} />
                    <ListGroup variant="flush">
                        <ListGroup.Item><Link to='/'>Manage payment info</Link></ListGroup.Item>
                        
                        <ListGroup.Item>
                            
                            <Link 
                                to='/profile/billing'
                                // state={{
                                //     orgPackage: orgPackage
                                // }}
                            >
                                
                                Billing details
                                
                            </Link>
                        
                        </ListGroup.Item>
                        
                    </ListGroup>
                </div>
           </div> 
        </>
    );
}
 
export default OrgPackage;