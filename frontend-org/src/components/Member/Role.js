import {Link} from "react-router-dom";
import StaffOptions from "./StaffOptions";
import {useParams, useNavigate} from 'react-router-dom'
import {MdOutlinePersonAdd} from 'react-icons/md'
import {getEventApi} from '../../api/axiosHook'
import { Button } from "react-bootstrap";
import DeleteRoleModal from "./DeleteRoleModal";
import EditRoleModal from "./EditRoleModal";


const Role = ({setEvent, roleType, permissions, members}) => {

    const { eventId } = useParams();
    const navigate = useNavigate();

    //const permissions = ['Admin', 'Edit Role', 'Read Only', 'Read-Write']

    const handleEdit = () => {
        console.log("e")
    }

    const handleDelete = (ref_id) => {
        console.log("refid", ref_id)

        let body = {
            ref_id: ref_id
        }

        getEventApi(localStorage.getItem('token')).post(`/${eventId}/remove-staff`, body).then(res => {
            console.log(res)
            setEvent(res.data.event)
            // navigate(`/event/${eventId}/members`)

        }).catch((err)=>{
            console.log(err.response.data.errors)
        })
    }

    return ( 
        <>
            <div className="role-container-header">
                <h3>{roleType}</h3>

                <EditRoleModal 
                    eventId={eventId} 
                    setEvent={setEvent}
                    roleType={roleType}
                    defaultPermissions={permissions}
                />
                <DeleteRoleModal 
                    eventId={eventId}
                    setEvent={setEvent}
                    roleType={roleType}
                />
                

                <Link 
                    to={`/event/${eventId}/staff/add`}
                    state={{ roleType: roleType }}
                >
                    <MdOutlinePersonAdd className="add-member-icon" />
                </Link>

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
                                        onDelete={(e)=>{handleDelete(member.ref_id)}}
                                    />

                                    <div className="person-info-body">
                                        <img src={member.profile_pic ? member.profile_pic : "https://i.kym-cdn.com/photos/images/original/001/884/907/c86.jpg"} alt="" />
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