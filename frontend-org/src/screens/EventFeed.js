import "../styles/EventFeed.css"

import PollModal from "../components/Feed/Poll/PollModal";
import QuizModal from "../components/Feed/Quiz/QuizModal";
import PostModal from "../components/Feed/Post/PostModal";

import PostDisplay from "../components/Feed/Post/PostDisplay";
import PollResult from "../components/Feed/Poll/PollResult";

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

                {/* <PostDisplay message={mess} username='jawad' timestamp='14/8/2022' image='https://i.redd.it/xmr50tmyqjh91.jpg'/>
                <PostDisplay message={mess} username='jawad' timestamp='14/8/2022' image='https://i.redd.it/4diyr90qddg91.jpg'/>
                <PostDisplay message={mess} username='jawad' timestamp='14/8/2022' image='https://i.redd.it/d6kybhyceqh91.jpg'/> */}
                <PostDisplay message={mess} username='jawad' timestamp='14/8/2022'image='https://i.redd.it/tfur3uql6fh91.jpg'/>

                <PollResult />
            </div>
          
        
        </>

        
     );
}
 
export default EventFeed;