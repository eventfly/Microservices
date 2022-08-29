import PopupModal from "../PopupModal";
import { Button, Col } from "react-bootstrap";
import { useState } from "react";
import { Delete} from '@material-ui/icons';


import { Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import {ImCross} from 'react-icons/im';
import Form from 'react-bootstrap/Form';

import {getNewsfeedApi} from '../../api/axiosHook'


const DeleteModal = ({post_id, allPosts, setAllPosts}) => {

    const [deleteModalShow, setDeleteModalShow] = useState(false);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        setDeleteModalShow(false);


        getNewsfeedApi(localStorage.getItem('token')).delete(`post/${post_id}`).then((res)=>{
            let newArr = [...allPosts.filter(post => post._id != post_id)]
            setAllPosts(newArr)
            //console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })

        console.log('d  elete')

    }

    const deleteJSX = (
        <div className="delete-modal">
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div className="fs-6">
                    Are you sure you want to delete this?
                </div>
                <div className="fs-6">
                    (This action cannot be undone)
                </div>
            </div>
        </div>

    )

    return ( 
        <>
        <div className="postOption" onClick={ () => setDeleteModalShow(true)}>
            <Delete />
            Delete
        </div>

            <PopupModal
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                header="Delete Content"
                bodyComponent={deleteJSX}
                size="sm"
                saveButtonText={"Yes"}
                saveButtonAction={handleSubmit}
            />

        </>

     );
}
 
export default DeleteModal;