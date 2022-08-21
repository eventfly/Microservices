import "../styles/EventFeed.css"

import PostDisplay from "../components/Feed/Post/PostDisplay";
import PollResult from "../components/Feed/Poll/PollResult";

import FeedHeader from "../components/Feed/FeedHeader";
import { useLocation, useParams } from "react-router-dom";

import QuizResultPreview from "../components/Feed/Quiz/QuizResultPreview";
import QuizResultDetails from "../components/Feed/Quiz/QuizResultDetails";

import { useState, useEffect } from "react";
import {getEventApi, getNewsfeedApi} from '../api/axiosHook'




const EventFeed = () => {

    const location = useLocation().pathname;
    const { eventId } = useParams();

    const mess = 'sdfkjfsdjfnajkebfkjsdfasdf a sdufhak ad asduifhaeuhffsdjfnajkebfkjsdfasdf a sdufhak ad asduifhaeuhffsdjfnajkebfkjsdfasdf a sdufhak ad asduifhaeuhffsdjfnajkebfkjsdfasdf a sdufhak ad asduifhaeuhff sdjfnajkebfkjsdfasdf a sdufhak ad asduifhae uhffsdjfnajkeb fkjsdfasdf a sdufhak ad asduifhaeuhffsdjfnajkebfkjsdfasdf a sdufhak ad asduifhaeuhfa kdfcicch9eurf a efifh389 fu uiefh8e'
    const [allPosts, setAllPosts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [eventFeed, setEventFeed] = useState(null);

    useEffect(() =>{

        async function fetchEventFeed(){

            if(loading == false){
                getNewsfeedApi(localStorage.getItem('token')).get(`${eventId}/post`).then((res)=>{
                    console.log(res.data.event)
                    setEventFeed(res.data.event)
                    setAllPosts([...res.data.event.posts])
                })
                .catch((err)=>{
                    console.log(err.response.data.errors)
                })

                setLoading(true)
            }
        }

        fetchEventFeed()


    }, [loading, eventFeed, allPosts])


    return ( 

        <>
            <FeedHeader setAllPosts={setAllPosts} />  

            <div className='feed-container'>

                {/* {
                                location.includes('quiz') ? <QuizResultDetails />:<EventFeed /> 

                } */}
                {/* <PollResult pollData={[]} /> */}
                <QuizResultPreview />

                {
                    allPosts &&
                    allPosts.map((post, index)=>{

                        if(post.poll_options.length > 0){
                            return(
                                <PollResult
                                    key={index}
                                    timeStamp={post.created_at}
                                    pollQuestion={post.content} 
                                    pollData={
                                        post.poll_options.map((opt, optId)=>{
                                            return{
                                                id: optId,
                                                text: opt.option,
                                                votes: 5
                                            }
                                        })
                                    } 
                                />
                            )
                        }

                        else{
                            return(
                                <PostDisplay
                                    key={index} 
                                    message={post.content} 
                                    username={post.creator.name} 
                                    timestamp={post.created_at}
                                    image={post.image} 
                                    // image='https://i.redd.it/xmr50tmyqjh91.jpg'
                                />
                            )
                        }
                    })
                }

                {/* <PostDisplay message={mess} username='jawad' timestamp='14/8/2022' image='https://i.redd.it/xmr50tmyqjh91.jpg'/>
                <PostDisplay message={mess} username='jawad' timestamp='14/8/2022' image='https://i.redd.it/4diyr90qddg91.jpg'/>
                <PostDisplay message={mess} username='jawad' timestamp='14/8/2022' image='https://i.redd.it/d6kybhyceqh91.jpg'/>
                <PostDisplay message={mess} username='jawad' timestamp='14/8/2022'image='https://i.redd.it/tfur3uql6fh91.jpg'/> */}

            </div>
          
        
        </>

        
     );
}
 
export default EventFeed;