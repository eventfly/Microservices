import FormTitle from "../../Form/FormTitle";
import {ListGroup} from 'react-bootstrap';
import SubPackage from "../../Subscription/SubPackage";
import {Link} from 'react-router-dom';

import ChangeBillingDay from './ChangeBillingDay';
import {ColorList} from "../../../constants/Color";

const OrgPackage = ({orgPackage}) => {
    return ( 
        <>
            <FormTitle title="Package" />
            <div className="profile_flexbox">

                <div className="left-column">
                    <div style={{marginBottom: '40px'}} />

                    <SubPackage 
                        headerColorClass={orgPackage? ColorList[orgPackage.color]:ColorList['default']}
                        isBuyOptionAvailable={false}
                        pkgData={orgPackage} 
                    />

                    {/* <Link to='/subscription'>
                        Browser More Packages
                    </Link> */}

                </div>

                <div className="right-column">
                    <div style={{marginBottom: '40px'}} />
                    <ListGroup variant="flush">
                        <ListGroup.Item><Link to='/'>Manage payment info</Link></ListGroup.Item>
                        
                        <ListGroup.Item><Link to='/profile/billing'> Billing details</Link></ListGroup.Item>

                        <ListGroup.Item><Link to='/subscription'>Browser More Packages</Link></ListGroup.Item>
                        
                    </ListGroup>
                </div>
           </div> 
        </>
    );
}
 
export default OrgPackage;