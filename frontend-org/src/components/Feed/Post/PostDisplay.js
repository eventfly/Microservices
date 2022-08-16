import React from 'react';
import './Post.css'
// import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Comment from './Comment';

// Icons
import { Avatar } from '@material-ui/core';
import { ThumbUp, ChatBubbleOutline, AccountCircle, NearMe, ExpandMoreOutlined } from '@material-ui/icons';
import {useState} from 'react';
import { Button } from 'react-bootstrap';

const PostDisplay = ({ profilePic, image, username, timestamp, message }) => {

    const [commentDisplayType, setCommentDisplayType] = useState('none');

    const displayCommentBox = () => {
        if (commentDisplayType === 'none') {
            setCommentDisplayType('flex');
        }
        else {
            setCommentDisplayType('none');
        }
    }

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
                    <p>{timestamp}</p>
                </div>
            </div>

            <div className="postBottom">
                {shownMessage}
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
                
                <div className="postOption">
                    <AccountCircle />
                    <ExpandMoreOutlined />
                </div>
            </div>
            <Comment  displayType={commentDisplayType} />
        </div>
    )
}

export default PostDisplay;
