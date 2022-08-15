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
import PostModal from "../components/Feed/Post/PostModal";

import Post from "../components/Feed/Post/Post";

const EventFeed = () => {

    const mess = 'sdfkjfsdjfnajkebfkjsdfasdf a sdufhak ad asduifhaeuhffsdjfnajkebfkjsdfasdf a sdufhak ad asduifhaeuhffsdjfnajkebfkjsdfasdf a sdufhak ad asduifhaeuhffsdjfnajkebfkjsdfasdf a sdufhak ad asduifhaeuhff sdjfnajkebfkjsdfasdf a sdufhak ad asduifhae uhffsdjfnajkeb fkjsdfasdf a sdufhak ad asduifhaeuhffsdjfnajkebfkjsdfasdf a sdufhak ad asduifhaeuhfa kdfcicch9eurf a efifh389 fu uiefh8e'


    return ( 

        <>
        
            <h1>
                feed
            </h1>

            <QuizModal />
            <PollModal />
            <PostModal />

            <div className='feed-container'>

                <Post message={mess} username='jawad' timestamp='14/8/2022' image='https://i.redd.it/xmr50tmyqjh91.jpg'/>
                <Post message={mess} username='jawad' timestamp='14/8/2022' image='https://i.redd.it/4diyr90qddg91.jpg'/>
                <Post message={mess} username='jawad' timestamp='14/8/2022' image='https://i.redd.it/d6kybhyceqh91.jpg'/>
                <Post message={mess} username='jawad' timestamp='14/8/2022'image='https://i.redd.it/tfur3uql6fh91.jpg'/>

                {/* <Poll limit={55}/> */}
            </div>
          
        
        </>

        
     );
}
 
export default EventFeed;