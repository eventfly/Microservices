import React from 'react';
import './Post.css'
// import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Comment from './Comment';

// Icons
import { Avatar } from '@material-ui/core';
import { ThumbUp, ChatBubbleOutline, AccountCircle, NearMe, ExpandMoreOutlined, Delete} from '@material-ui/icons';

import {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import parse from 'html-react-parser'
import { getNewsfeedApi } from '../../../api/axiosHook';
import DeleteModal from '../DeleteModal';

const PostDisplay = ({ profilePic, image, username, timestamp, message, post_id, allPosts, setAllPosts}) => {
    console.log(post_id);

    const [commentDisplayType, setCommentDisplayType] = useState('none');

    const [commentList, setCommentList] = useState([]);

    const [loading, setLoading] = useState(false);


    const dateFormatter = (time) => {
        let date = time.split('T')[0]

        let yr = date.split('-')[0].substring(2, 4)
        let mon = date.split('-')[1]
        let day = date.split('-')[2]

        let clock = time.split('T')[1]
        let hr = clock.split(':')[0]
        let min = clock.split(':')[1]
        
        return hr + ":" + min + " " + day + "/" + mon + "/" + yr;
    }

    const displayCommentBox = () => {
        if (commentDisplayType === 'none') {
            setCommentDisplayType('flex');
        }
        else {
            setCommentDisplayType('none');
        }
    }

    useEffect(() =>{

        async function fetchComments(){

            if(loading == false){
                //if(commentDisplayType === 'none'){
                    getNewsfeedApi(localStorage.getItem('token')).get(`post/${post_id}/comment`).then((res)=>{
                        console.log(res)
                        console.log(res.data.post.comments)
                        setCommentList([...res.data.post.comments])
                    })
                    .catch((err)=>{
                        console.log(err.response.data.errors)
                    })

                    setLoading(true)
                }
            }
      //  }

        fetchComments()


    }, [loading, commentDisplayType, commentList])

    const [buttonDisplay, setButtonDisplay] = useState(message.length > 300 ? 'inline' : 'none');
    const [shownMessage, setShownMessage] = useState(message.substring(0, 300));
    
    const seeMoreClicked = () => {
        setButtonDisplay('none');
        setShownMessage(message);
        console.log('see more clicked');
    }

    return (
        <div className="post">
            <div className="postTop">
                <Avatar src={profilePic} className="postAvatar" />

                <div className="postTopInfo">
                    <h3>{username}</h3>
                    <p>{dateFormatter(timestamp)}</p>
                </div>
            </div>

            <div className="postBottom">
                {parse(shownMessage)}
                <a style={{
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: buttonDisplay,
                }} onClick = {seeMoreClicked}>... See more</a>    

            </div>

            <div className="postImage">
                {/* <img src={image} alt=""/> */}
                {
                    image===null ? null : <img src={image} alt=""/>
                }
                {/* <img src={image} className='img-fluid shadow-4' alt='...' /> */}
                {/* <img src={image} className='img-fluid' /> */}
      
            </div>

            <div className="postOptions">
                <div className="postOption" onClick={displayCommentBox}>
                    <ChatBubbleOutline />
                    Comment
                </div>
                
                
                <DeleteModal post_id={post_id} setAllPosts={setAllPosts} allPosts={allPosts}/>

            </div>
            <Comment 
                displayType={commentDisplayType}
                commentList={commentList} 
                setCommentList={setCommentList}
                post_id={post_id}
            />
        </div>
    )
}

export default PostDisplay;
