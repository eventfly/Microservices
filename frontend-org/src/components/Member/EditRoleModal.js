import { useState, useEffect } from 'react';
import FormInput from '../Form/FormInput';
import PopupModal from '../PopupModal';
import AutoComplete from '../AutoComplete'
import {BiPencil} from 'react-icons/bi'
import {getEventApi, getOrgApi} from '../../api/axiosHook'

const EditRoleModal = ({id, setData, roleType, defaultPermissions, apiCallRoute, members}) => {

    const [modalShow, setModalShow] = useState(false);
    const [permissions, setPermissions] = useState([]);

    const [permitOptions, setPermitOptions] = useState(['Admin', 'Edit Role', 'Read Only', 'Read-Write']);

    useEffect(() => {

        if(defaultPermissions && defaultPermissions.length > 0){
            setPermissions([...defaultPermissions])
        }

    }, [defaultPermissions])

    const modalJSX = (
        <>
        
            <div style={{marginBottom: '20px'}}>

                <FormInput id="role"
                    inputType="text"
                    label="Role"
                    value={roleType}
                    isDisabled={true}
                />

                <div style={{marginTop: '30px'}}></div>

                <AutoComplete
                    label={'Permissions'}
                    placeholder={'Allow several permissions'}
                    options={permitOptions}
                    setOptions={setPermitOptions}
                    multiSelections={permissions}
                    setMultiSelections={setPermissions}
                    isNewItemsAllowed={true}
                />

            </div>
        
        </>
    )


    const handleSubmit = (e) => {
        e.preventDefault();

        let body = {
            name: roleType,
            permissions: permissions,
            staffIds: members.map((member)=>{
                return member.id
            })
        }

        console.log(body)

        let api = getOrgApi

        if(apiCallRoute == 'events'){
            api = getEventApi
        }

        api(localStorage.getItem('token')).put(`/${id}/role`, body).then((res)=>{
            setPermissions([])
            setModalShow(false)

            console.log(res.data)

            if(apiCallRoute == 'events'){
                setData(res.data.event)
            }
            else if(apiCallRoute == 'org'){
                setData(res.data.existingUser)
            }

        }).catch((err)=>{
            console.log(err.response.data.errors)
        })
    }


    return ( 

        <>
            <BiPencil className="edit-role-icon" onClick={() => setModalShow(true)} />

            <PopupModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                header="Edit Role"
                bodyComponent={modalJSX}
                saveButtonText={"Save Changes"}
                saveButtonAction={handleSubmit}
                size="md"
            />

        </>

    );
}
 
export default EditRoleModal;