import { Avatar } from '@material-ui/core';
import FormInput from '../../Form/FormInput';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
import FormTextArea from '../../Form/FormTextArea';
import {getNewsfeedApi} from '../../../api/axiosHook';


const  Comment= ({displayType, commentList, setCommentList, post_id}) => {
    const commentBoxStyle = {
        width: '100%',
        border: 'none',
        display: displayType,
    } 

    const [myComment, setMyComment] = useState('');


    const handleEnter = (e) => {
        if(e.key === 'Enter' && !e.shiftKey){
            console.log(myComment);
            setTimeout(() => {
                setMyComment('');
            },100);

            let comment = {
                content: myComment,
            }

            getNewsfeedApi(localStorage.getItem('token')).post(`post/${post_id}/comment`,comment).then((res)=>{
                setCommentList([...commentList, res.data.resp])
                console.log(commentList)
            })
            .catch((err)=>{
                console.log(err.response.data.errors)
            })

            
        }
    }



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
                     commentList.map((comment, index) => {
                            return (
                                <ListGroup.Item key={index}>
                                    <Card style={commentBoxStyle}>
                                        <Card.Header className='comment-header'>
                                            <Avatar className="postAvatar" />

                                            <div className="postTopInfo">
                                                {comment.creator? <h3>{comment.creator.id.name}</h3> : <h3>Anonymous</h3>}
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            {comment.content}
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