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
    const [managerData, setManagerData] = useState(null);

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

                let route = `/${auth.ref_id}/data`

                if(auth.role == 'Manager'){
                    route = `/staff/${auth.ref_id}`
                }
                
                getOrgApi(localStorage.getItem('token')).get(route).then(async (res)=>{
                    console.log(res.data.existingUser)
                    // setOrgData(res.data.existingUser)

                    if(auth.role == 'Manager'){
                        auth.parentOrg = res.data.existingUser.organizer
                        window.sessionStorage.setItem('auth', JSON.stringify(auth));
                        const result = await getOrgApi(localStorage.getItem('token')).get(`/${res.data.existingUser.organizer}/data`)
                        console.log(result.data.existingUser)
                        setManagerData(res.data.existingUser)
                        setOrgData(result.data.existingUser)
                    }
                    else{
                        setOrgData(res.data.existingUser)
                    }


                    let orgId = auth.ref_id
                    if(auth.role == 'Manager'){
                        orgId = res.data.existingUser.organizer
                    }

                    getOrgApi(localStorage.getItem('token')).get(`/${orgId}/staffs`).then((res2)=>{
                        console.log(res2.data.staffs)
                        setStaffs([...res2.data.staffs])
    
                    }).catch((err2)=>{
                        console.log(err2)
                    })
    

                }).catch((err)=>{
                    console.log(err.response.data.errors)
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
                    location.includes('account') ? (
                        <OrgAccount 
                            orgData={auth && auth.role == 'Manager' ? managerData : orgData} 
                            setOrgData={auth && auth.role == 'Manager' ? setManagerData : setOrgData} 
                        /> 
                    )

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