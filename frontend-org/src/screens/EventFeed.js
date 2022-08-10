import { Button } from "react-bootstrap";
import EventSidebar from "../components/EventSidebar";
import "../styles/EventFeed.css"
import { useState } from "react";
import PopupModal from "../components/PopupModal";
import SubscriptionModal from "../components/Subscription/SubscriptionModal";

import Quiz from "../components/Feed/Quiz/Quiz";
import Poll from "../components/Feed/Poll/Poll";
import PollModal from "../components/Feed/Poll/PollModal";
import QuizModal from "../components/Feed/Quiz/QuizModal";

const EventFeed = () => {


    return ( 

        <>
        
            <h1>
                feed
            </h1>

            <QuizModal />
            <PollModal />
            
          
        
        </>

        
     );
}
 
export default EventFeed;