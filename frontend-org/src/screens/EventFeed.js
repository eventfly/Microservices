import EventSidebar from "../components/EventSidebar";
import "../styles/EventFeed.css"

const EventFeed = () => {
    return ( 

        <>
        
            <div className="detail_flexbox">

                <div className="left-column">
                    <EventSidebar/>
                </div>

                <div className="right-column">
                    <h1>
                        feed
                    </h1>
                </div>
            
            </div>
        
        </>

        
     );
}
 
export default EventFeed;