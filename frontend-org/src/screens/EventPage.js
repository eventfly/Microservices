import "../styles/EventPage.css";
import EventSidebar from "../components/EventSidebar";
import { useLocation } from 'react-router-dom';


const EventPage = () => {
    const location = useLocation();
    console.log(location.pathname);


    return ( 
        <>
        
            <div className="detail_flexbox">

                <div className="left-column">
                    hello world
                </div>
                
            </div>
        
        </>
    );
}
 
export default EventPage;