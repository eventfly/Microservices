import { useState } from 'react';
import PopupModal from '../PopupModal';
import {RiDeleteBin6Line} from 'react-icons/ri'
import {getEventApi, getOrgApi} from '../../api/axiosHook'


const DeleteRoleModal = ({id, setData, roleType, apiCallRoute, members, setLoading}) => {

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

        let api = getOrgApi

        if(apiCallRoute == 'events'){
            api = getEventApi
        }

        api(localStorage.getItem('token')).delete(`/${id}/role`, {
            data:{
                name: roleType,
                staffIds: members.map((member)=>{
                    return apiCallRoute == 'org' ? member.id : member.ref_id
                })
            }
        }).then((res)=>{
            setModalShow(false)
            
            console.log(res.data)
            if(apiCallRoute == 'events'){
                setData(res.data.event)
            }
            else if(apiCallRoute == 'org'){
                setData(res.data.existingUser)
                // to fetch staffs
                setLoading(false)
            }

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