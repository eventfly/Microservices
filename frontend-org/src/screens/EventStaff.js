import EventSidebar from "../components/EventSidebar";
import '../styles/EventStaff.css'
import Role from '../components/Staff/Role'
import { Link } from "react-router-dom";

const EventStaff = () => {
        
    return ( 
        <>
            <div className="staff-container-header">
                <h2>Members & Roles</h2>
                <div className="staff-container-buttons">
                    <button>+ Add Role</button>
                </div>
            </div>
            <div className="role-container">
                <Role roleType='Organizer'/>
            </div>
        </>
        
     );
}
 
export default EventStaff;


