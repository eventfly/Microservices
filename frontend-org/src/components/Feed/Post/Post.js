import React from 'react';
import './Post.css'
// import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Comment from './Comment';

// Icons
import { Avatar } from '@material-ui/core';
import { ThumbUp, ChatBubbleOutline, AccountCircle, NearMe, ExpandMoreOutlined } from '@material-ui/icons';
import {useState} from 'react';

const Post = ({ profilePic, image, username, timestamp, message }) => {

    const [commentDisplayType, setCommentDisplayType] = useState('none');

    const displayCommentBox = () => {
        if (commentDisplayType === 'none') {
            setCommentDisplayType('flex');
        }
        else {
            setCommentDisplayType('none');
        }
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
                <p>{message}</p>
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

export default Post;
