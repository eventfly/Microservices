import PopupModal from "../../PopupModal";
import { Button} from "react-bootstrap";
import { useState } from "react";

import { Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import {ImCross} from 'react-icons/im';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import {getNewsfeedApi} from '../../../api/axiosHook'


const MdPostModal = ({setAllPosts}) => {

    const [postModalShow, setPostModalShow] = useState(false);

    const [content, setContent] = useState('');
    const [postImage, setPostImage] = useState('');
    const { eventId } = useParams();

    const [html, setHtml] = useState('');


    const uploadImage = (e) => {
        const file = e.target.files[0];
        const storage = getStorage();
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                console.log("Loading");
            },
            (error) => {
                console.log("Error");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    console.log(downloadUrl);
                    setPostImage(downloadUrl);
                    sessionStorage.setItem("post_image", downloadUrl);
                    // document.getElementById("banner").style.backgroundImage = `url(${downloadUrl})`;
                })
            }
        );
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // if(content===''){
        //     alert('Please enter some content');
        //     return;
        // }
        // setContent(html);
        setPostModalShow(false);

        let post = {
            content: content,
            image: postImage,
            poll_options: [],
            questions: []
        }

        console.log(post)

        getNewsfeedApi(localStorage.getItem('token')).post(`${eventId}/post`, post).then((res)=>{
            setAllPosts(allPosts => [...allPosts, res.data.post])
        })
        .catch((err)=>{
            console.log(err.response.data.errors)
        })

    }

    const clickInputButton = (e) => {
        document.getElementById("uploadInput").click();
    }

    // Initialize a markdown parser
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    // Finish!
    function handleEditorChange({ html, text }) {
        // console.log('handleEditorChange\n',"html:\n", html,"\ntext:\n", text);
        setHtml(html);
        setContent(html);
    }

    const postJSX = (
        <Stack gap={4}>
            <MdEditor
                style={{ height: '300px' }}
                renderHTML={text => mdParser.render(text)}
                onChange={handleEditorChange}
            />
     
            <div>
                <Button variant="primary" onClick={clickInputButton}>
                    <input type={"file"} onChange={uploadImage} id={"uploadInput"} hidden></input>
                    + Add Image
                </Button>
            </div>
            <div>
                {
                    postImage !== '' ? (
                        <>
                            <Button variant="secondary" style={{position:'absolute'}}>

                            <ImCross  onClick={() => setPostImage('')}/>
                            </Button>
                            <img src={postImage} alt="postImage" style={{ width: '40%' }} />
                            
                        </>

                    ) : (
                            <></>
                        )
                }
            </div>
            
        </Stack>

    )

    return ( 
        <>
            <Button variant="contained" color="primary" onClick={ () => setPostModalShow(true)}> Add Md post</Button>    

            <PopupModal
                show={postModalShow}
                onHide={() => setPostModalShow(false)}
                header="New Markdown Post"
                bodyComponent={postJSX}
                size="lg"
                saveButtonText={"Add Post"}
                saveButtonAction={handleSubmit}
            />

        </>

     );
}
 
export default MdPostModal;