import EventSidebar from "../components/EventSidebar";
import '../styles/EventStaff.css'
import Role from '../components/Staff/Role'

const EventStaff = () => {
        
    return ( 
        <>
        <EventSidebar/>
        <div className="staff-container">
            <div className="staff-container-header">
                <h2>Members & Roles</h2>
                <button>Add Role</button>
            </div>
            <div class="role-container">
                <Role roleType='Organizer'/>
            </div>
        </div>
        </>
        
     );
}
 
export default EventStaff;


