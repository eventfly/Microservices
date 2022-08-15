import { Avatar } from '@material-ui/core';
import FormInput from '../../Form/FormInput';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
import FormTextArea from '../../Form/FormTextArea';


const  Comment= ({displayType}) => {



    const commentBoxStyle = {
        width: '100%',
        border: 'none',
        display: displayType,
    } 

    const [myComment, setMyComment] = useState('');


    const handleEnter = (e) => {
        if(e.key === 'Enter' && !e.shiftKey){
            console.log(myComment);
            setCommentList([{body: myComment, username: 'You'}, ...commentList]);
            setTimeout(() => {
                setMyComment('');
            },100);

        }
    }

    const comments = [
        {
            username: 'John Doe',
            body: 'all the late night bargains have been struck',
        },
        {
            username: 'John Doe',
            body: 'all the late night bargains have been struck',
        },
        {
            username: 'John Doe',
            body: 'all the late night bargains have been struck',
        },
    ]

    const [commentList, setCommentList] = useState(comments);

    return ( 
        <>
            <Card style={commentBoxStyle}>
                <ListGroup variant="flush">
                    <ListGroup.Item className='d-flex flex-column justify-content-end'>
                        <FormTextArea 
                            placeholder="Add a comment"
                            bgColor={'#e5e5e5'}
                            value = {myComment}
                            onChange = {setMyComment}
                            onKeyDown = {handleEnter}
                        />
                    </ListGroup.Item>
                    {
                        commentList.map(comment => {
                            return (
                                <ListGroup.Item>
                                    <Card style={commentBoxStyle}>
                                        <Card.Header className='comment-header'>
                                            <Avatar  className="postAvatar" />

                                            <div className="postTopInfo">
                                                <h3>{comment.username}</h3>
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            {comment.body}
                                        </Card.Body>
                                    </Card>
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
            </Card>
            
        </>
     );
}
 
export default Comment;