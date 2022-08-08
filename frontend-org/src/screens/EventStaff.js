import EventSidebar from "../components/EventSidebar";
import '../styles/EventStaff.css'
import Role from '../components/Staff/Role'
import { Link } from "react-router-dom";

const EventStaff = () => {
        
    return ( 
        <>

            {/* <div className="detail_flexbox">

                <div className="left-column">
                    <EventSidebar/>
                </div>


                <div className="right-column"> */}
                    <div className="staff-container-header">
                        <h2>Members & Roles</h2>
                        <div className="staff-container-buttons">
                            <button>+ Add Role</button>
                        </div>
                    </div>
                    <div className="role-container">
                        <Role roleType='Organizer'/>
                    </div>
                {/* </div>

            </div> */}

        </>
        
     );
}
 
export default EventStaff;


