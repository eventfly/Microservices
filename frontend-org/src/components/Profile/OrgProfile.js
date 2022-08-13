import OrgSidebar from "./OrgSidebar";

import OrgAccount from "./OrgProfileMenu/OrgAccount";
import OrgPackage from "./OrgProfileMenu/OrgPackage";
import OrgMembers from "./OrgProfileMenu/OrgMembers";
import OrgStatistics from "./OrgProfileMenu/OrgStatistics";

import {useLocation} from 'react-router-dom'
import {useState} from 'react'



function OrgProfile() {
  const location = useLocation().pathname;
  const [Loading, setLoading] = useState(false);

    return ( 
    <>
        <div className="org-profile-flexbox">
            <div className="sidebar-column">
                <OrgSidebar />
            </div>
            <div className="main-content-column">
            {
                location.includes('account') ? <OrgAccount />
                : location.includes('package') ? <OrgPackage />
                : location.includes('members') ? <OrgMembers setLoading={setLoading} />
                : location.includes('statistics') ? < OrgStatistics />
                : <>    </>
            }
            </div>
        </div>      

    </>
 );
}
 
export default OrgProfile;