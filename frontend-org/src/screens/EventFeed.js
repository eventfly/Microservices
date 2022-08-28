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

    const [allPosts, setAllPosts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [eventFeed, setEventFeed] = useState(null);

    useEffect(() =>{

        async function fetchEventFeed(){

            if(loading == false){
                getNewsfeedApi(localStorage.getItem('token')).get(`${eventId}/post`).then((res)=>{
                    console.log(res)
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

                        // else if(post.questions.length > 0){
                        //     return(
                        //         <QuizResultPreview
                        //             key={index}


                        else{
                            return(
                                <PostDisplay
                                    key={index} 
                                    profilePic={post.creator.avatar}
                                    message={post.content} 
                                    username={post.creator.name} 
                                    timestamp={post.created_at}
                                    image={post.image} 
                                    post_id = {post._id}
                                    // image='https://i.redd.it/xmr50tmyqjh91.jpg'
                                />
                            )
                        }
                    })
                }


            </div>
          
        
        </>

        
     );
}
 
export default EventFeed;