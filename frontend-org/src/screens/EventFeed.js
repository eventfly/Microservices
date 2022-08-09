import { Button } from "react-bootstrap";
import EventSidebar from "../components/EventSidebar";
import "../styles/EventFeed.css"
import { useState } from "react";
import PopupModal from "../components/PopupModal";
import SubscriptionModal from "../components/Subscription/SubscriptionModal";

import Quiz from "../components/Feed/Quiz/Quiz";

const EventFeed = () => {

    const [quizModalShow, setQuizModalShow] = useState(false);
    const [pollModalShow, setPollModalShow] = useState(false);

    return ( 

        <>
        
            <h1>
                feed
            </h1>

        
            <Button variant="contained" color="primary" onClick={ () => setQuizModalShow(true)}> Add quiz</Button>
            <Button variant="contained" color="primary" onClick={ () => setPollModalShow(true)}> Add poll</Button>    

            <PopupModal
                show={quizModalShow}
                onHide={() => setQuizModalShow(false)}
                header="QUIZ"
                bodyComponent={<Quiz onHide={() => setQuizModalShow(false)}/>}
                size="lg"
                saveButtonText={"Add Quiz"}
            />

            <PopupModal
                show={pollModalShow}
                onHide={() => setPollModalShow(false)}
                header="Poll"
                bodyComponent={<SubscriptionModal />}
            />
        
        </>

        
     );
}
 
export default EventFeed;