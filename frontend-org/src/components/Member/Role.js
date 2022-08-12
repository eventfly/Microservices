import {Link} from "react-router-dom";
import StaffOptions from "./StaffOptions";
import {useParams, useNavigate} from 'react-router-dom'
import {MdOutlinePersonAdd} from 'react-icons/md'
import {getEventApi} from '../../api/axiosHook'
import { Button } from "react-bootstrap";
import {BiPencil} from 'react-icons/bi'


const Role = ({roleType, members, setLoading}) => {

    const { eventId } = useParams();
    const navigate = useNavigate();

    const permissions = ['Admin', 'Edit Role', 'Read Only', 'Read-Write']

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
            setLoading(false)
            // navigate(`/event/${eventId}/members`)

        }).catch((err)=>{
            console.log(err.response.data.errors)
        })
    }

    return ( 
        <>
            <div className="role-container-header">
                <h3>{roleType}</h3>

                <BiPencil className="edit-role-icon" />

                <Link to={`/event/${eventId}/staff/add`}>
                    <MdOutlinePersonAdd className="add-member-icon" />
                </Link>

                <div className="d-grid gap-0 d-md-flex justify-content-md-start">
                {
                    permissions.map((p)=>{
                        return(
                            <Button
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