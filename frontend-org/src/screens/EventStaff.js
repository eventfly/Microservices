import EventSidebar from "../components/EventSidebar";
import '../styles/EventStaff.css'
import Role from '../components/Staff/Role'
import { Link } from "react-router-dom";

const EventStaff = () => {
        
    return ( 
        <>
        <EventSidebar/>
        <div className="staff-container">
            <div className="staff-container-header">
                <h2>Members & Roles</h2>
                <div className="staff-container-buttons">
                    <Link to="/detail/staff/add">
                        <button>+ Add Staff</button>
                    </Link>
                    <button>+ Add Role</button>
                </div>
            </div>
            <div class="role-container">
                <Role roleType='Organizer'/>
            </div>
        </div>
        </>
        
     );
}
 
export default EventStaff;


