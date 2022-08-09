import EventSidebar from "../components/EventSidebar";
import '../styles/EventMember.css'
import Role from '../components/Member/Role'
import { Link } from "react-router-dom";
import { useState } from 'react';
import {MdOutlineGroupAdd} from 'react-icons/md'
import PopupModal from "../components/PopupModal";
import AddRoleModal from "../components/Member/AddRoleModal";

const EventMember = ({organizers, staffs}) => {

    const [modalShow, setModalShow] = useState(false);
        
    return ( 
        <>
            <div className="role-header">

                <h2>Roles</h2>
                <MdOutlineGroupAdd className="add-role-icon" onClick={() => setModalShow(true)} />

            </div>

            <div className="role-container">
                <Role roleType='Organizers' members={organizers}/>
            </div>

            <div className="role-container">
                <Role roleType='Staffs' members={staffs}/>
            </div>


            <PopupModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                header="Add New Role"
                bodyComponent={<AddRoleModal />}
                saveButtonText={"Save"}
            />


        </>
        
     );
}
 
export default EventMember;


