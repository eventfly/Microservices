import PopupModal from "../../PopupModal";
import { Button, FormText } from "react-bootstrap";
import { useState } from "react";

import { Stack } from "react-bootstrap";

import FormTextArea from "../../Form/FormTextArea";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import {ImCross} from 'react-icons/im';

import Form from 'react-bootstrap/Form';

const PostModal = () => {

    const [postModalShow, setPostModalShow] = useState(false);

    const [content, setContent] = useState('');
    const [postImage, setPostImage] = useState('');


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
        if(content===''){
            alert('Please enter some content');
            return;
        }
        setPostModalShow(false);
        console.log(content);
        console.log(postImage);
    }

    const clickInputButton = (e) => {
        document.getElementById("uploadInput").click();
    }

    const postJSX = (
        <Stack gap={4}>
            <div>
                <FormTextArea
                    label="Post Content"
                    placeholder="Enter post content"
                    backgroundColor={'#e5e5e5'}
                    height={'12rem'}
                    value={content}
                    onChange={setContent}
                />

            </div>



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
            <Button variant="contained" color="primary" onClick={ () => setPostModalShow(true)}> Add post</Button>    

            <PopupModal
                show={postModalShow}
                onHide={() => setPostModalShow(false)}
                header="New Post"
                bodyComponent={postJSX}
                size="lg"
                saveButtonText={"Add Post"}
                saveButtonAction={handleSubmit}
            />

        </>

     );
}
 
export default PostModal;