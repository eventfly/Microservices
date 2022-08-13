import OrgSidebar from "./OrgSidebar";
import Account from "./OrgProfileMenu/Account";

import Package from "./OrgProfileMenu/Package";
import OrgMembers from "./OrgProfileMenu/OrgMembers";

import {useLocation} from 'react-router-dom'

function OrgProfile() {
  const location = useLocation().pathname;

    return ( 
    <>
        <div className="org-profile-flexbox">
            <div className="sidebar-column">
                <OrgSidebar />
            </div>
            <div className="main-content-column">
            {
                location.includes('account') ? <Account />
                : location.includes('package') ? <Package />
                : location.includes('members') ? <OrgMembers />
                : <>    </>
            }
            </div>
        </div>      

    </>
 );
}
 
export default OrgProfile;