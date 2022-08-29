import {Link} from "react-router-dom";
import StaffOptions from "./StaffOptions";
import {useParams, useNavigate} from 'react-router-dom'
import {MdOutlinePersonAdd} from 'react-icons/md'
import {getEventApi, getOrgApi} from '../../api/axiosHook'
import { Button } from "react-bootstrap";
import DeleteRoleModal from "./DeleteRoleModal";
import EditRoleModal from "./EditRoleModal";
import AssignRoleModal from "./AssignRoleModal";
import image from '../../images/avatar.png'


// setData is either event or staffs

const Role = ({orgId, setData, roleType, permissions, members, displayEditModal, orgStaffs, setStaffs, setLoading}) => {

    const { eventId } = useParams();
    const navigate = useNavigate();

    //const permissions = ['Admin', 'Edit Role', 'Read Only', 'Read-Write']

    const staffsToBeAssigned = () => {
        return orgStaffs.filter((st)=>{
            let hasMatch = members.filter((member)=>{
                return member.email == st.email
            })

            return hasMatch.length == 0
        })
    }

    const handleEdit = () => {
        console.log("e")
    }

    const handleDelete = (staffId, idx) => {
        console.log("staffId", staffId)

        let body = {
            orgId : orgId,
            staffId: staffId
        }

        if(displayEditModal == 'none'){
            getEventApi(localStorage.getItem('token')).post(`/${eventId}/remove-staff`, body).then(res => {
                console.log(res)
                setData(res.data.event)
    
            }).catch((err)=>{
                console.log(err.response.data.errors)
            })
        }

        else{
            getOrgApi(localStorage.getItem('token')).post(`/remove-staff`, body).then(res => {

                //setStaffs
                getOrgApi(localStorage.getItem('token')).get(`/${orgId}/staffs`).then((res2)=>{
                    console.log(res2.data.staffs)
                    setStaffs([...res2.data.staffs])

                }).catch((err2)=>{
                    console.log(err2)
                })
    
            }).catch((err)=>{
                console.log(err.response.data.errors)
            })
        }

    }

    return ( 
        <>
            <div className="role-container-header">
                <h3>{roleType}</h3>

                <div                 
                    style={{
                        display: displayEditModal
                    }} 
                >
                <EditRoleModal 
                    id={orgId} 
                    setData={setData}
                    roleType={roleType}
                    defaultPermissions={permissions}
                    apiCallRoute={'org'}
                    members={members}
                />
                </div>
                
                {
                    roleType != 'Managers' ? (
                        <DeleteRoleModal 
                            id={displayEditModal == 'none' ? eventId : orgId} 
                            setData={setData}
                            roleType={roleType}
                            apiCallRoute={displayEditModal == 'none' ? 'events' : 'org'}
                            members={members}
                            setLoading={setLoading}
                        />
                    ) : (
                        <></>
                    )
                }
                
                <div>
                {
                    displayEditModal == 'none' ? (
                        <AssignRoleModal 
                            id={eventId} 
                            setData={setData}
                            roleType={roleType}
                            staffsToBeAssigned={orgStaffs ? staffsToBeAssigned() : []}
                        />
                    ) : (

                        <Link 
                            to={`/profile/staff/add`}
                            state={{ 
                                roleType: roleType != 'Default' ? roleType.slice(0, -1) : roleType,
                                permissions: permissions
                            }}
                        >
                            <MdOutlinePersonAdd className="add-member-icon" />
                        </Link>
                    )
                }
                </div>


                <div className="d-grid gap-0 d-md-flex justify-content-md-start">
                {
                    permissions && permissions.map((p, index)=>{
                        return(
                            <Button
                                key={index}
                                size="sm"
                                variant="outline-secondary"
                                style={{
                                    backgroundColor: '#ABABAB',
                                    fontSize: '0.85rem',
                                    color: 'black'
                                }}
                            >
                                {p}
                            </Button>
                        )
                    })
                }
                </div>

            </div>

            <div className="person-container">
            {
                (
                    members && members.map((member, index) =>{
                        return (
                                <div className="person-info" key={index}>
                                    <StaffOptions 
                                        onEdit={handleEdit} 
                                        onDelete={(e)=>{
                                            handleDelete(displayEditModal == 'none' ? member.ref_id : member.id)
                                        }}
                                    />

{/* "https://i.kym-cdn.com/photos/images/original/001/884/907/c86.jpg" */}

                                    <div className="person-info-body">
                                        <img src={member.profile_pic ? member.profile_pic : image} alt="" />
                                        <div className="person-info-text">
                                            <h5 className="person-name"> {member.name} </h5>
                                            <p className="person-email"> {member.email} </p>
                                            <Link to='#'><h6 style={{fontSize:"small"}}>Details</h6></Link>
                                        </div>
                                    </div>
                                </div>
    
                            );
                    })
                ) 
            }
            </div>
        </>
     );
}
 
export default Role;