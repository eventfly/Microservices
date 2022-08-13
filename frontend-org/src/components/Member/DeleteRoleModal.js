import { useState } from 'react';
import PopupModal from '../PopupModal';
import {RiDeleteBin6Line} from 'react-icons/ri'
import {getEventApi} from '../../api/axiosHook'


const DeleteRoleModal = ({eventId, setEvent, roleType}) => {

    const [modalShow, setModalShow] = useState(false);

    const modalJSX = (
        <>
        
            <div style={{marginBottom: '20px', marginTop: '20px'}}>

                <h5> Do you want to delete <strong>{roleType}</strong> role? </h5>

            </div>
        
        </>
    )


    const handleSubmit = (e) => {
        e.preventDefault();

        getEventApi(localStorage.getItem('token')).delete(`/${eventId}/role`, {
            data:{
                name: roleType
            }
        }).then((res)=>{

            console.log(res.data.event)
            setModalShow(false)
            setEvent(res.data.event)

        }).catch((err)=>{
            console.log(err.response.data.errors)
        })
    }


    return ( 

        <>

            <RiDeleteBin6Line className="delete-role-icon" onClick={() => setModalShow(true)} />

            <PopupModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                header="Delete Role"
                bodyComponent={modalJSX}
                saveButtonText={"Delete"}
                saveButtonAction={handleSubmit}
                size="md"
                willDelete={true}
            />

        </>

    );
}
 
export default DeleteRoleModal;