import OrgSidebar from "./OrgSidebar";

import OrgAccount from "./OrgProfileMenu/OrgAccount";
import OrgPackage from "./OrgProfileMenu/OrgPackage";
import OrgMembers from "./OrgProfileMenu/OrgMembers";
import OrgStatistics from "./OrgProfileMenu/OrgStatistics";

import {useLocation, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {getOrgApi} from '../../api/axiosHook'
import AddStaff from "../../screens/AddStaff";
import BillingDetails from "./OrgProfileMenu/BillingDetails";



function OrgProfile() {
    const location = useLocation().pathname;
    const [loading, setLoading] = useState(false);
    const [orgData, setOrgData] = useState(null);
    const [staffs, setStaffs] = useState(null);

    const navigate = useNavigate();

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }

    let token = localStorage.getItem('token')

    useEffect(() => {

        if(!auth && !token){
            navigate('/login')
        }

        async function fetchOrgData(){
            if (auth && auth.ref_id && (loading == false)) {
                
                getOrgApi(localStorage.getItem('token')).get(`/${auth.ref_id}/data`).then((res)=>{
                    console.log(res.data.existingUser)
                    setOrgData(res.data.existingUser)

                }).catch((err)=>{
                    console.log(err.response.data.errors)
                })


                getOrgApi(localStorage.getItem('token')).get(`/${auth.ref_id}/staffs`).then((res2)=>{
                    console.log(res2.data.staffs)
                    setStaffs([...res2.data.staffs])

                }).catch((err2)=>{
                    console.log(err2)
                })

                setLoading(true)
            }
            
        }

        fetchOrgData()

    }, [auth, loading, orgData, staffs])

    return ( 
        auth &&
        
        <>
            <div className="org-profile-flexbox">
                <div className="sidebar-column">
                    <OrgSidebar />
                </div>
                <div className="main-content-column">
                {
                    location.includes('account') ? <OrgAccount orgData={orgData} setOrgData={setOrgData} /> 
                    : location.includes('package') ? (
                        <OrgPackage orgPackage={orgData ? orgData.current_package : null} />
                    )
                    
                    : location.includes('members') ? (
                        <OrgMembers 
                            orgData={orgData} 
                            setOrgData={setOrgData}
                            staffs={staffs}
                            setStaffs={setStaffs}
                        />
                    )
                    : location.includes('statistics') ? < OrgStatistics />
                    : location.includes('staff/add') ? <AddStaff /> 
                    : location.includes('/billing') ? <BillingDetails orgPackage={orgData ? orgData.current_package : null} /> 
                    : <>    </>
                }
                </div>
            </div>      

        </>
 );
}
 
export default OrgProfile;