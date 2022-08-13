import { useState, useEffect } from 'react';
import FormInput from '../Form/FormInput';
import PopupModal from '../PopupModal';
import AutoComplete from '../AutoComplete'
import {BiPencil} from 'react-icons/bi'
import {getEventApi} from '../../api/axiosHook'

const EditRoleModal = ({eventId, setEvent, roleType, defaultPermissions}) => {

    const [modalShow, setModalShow] = useState(false);
    const [permissions, setPermissions] = useState([]);

    const permitOptions = ['Admin', 'Edit Role', 'Read Only', 'Read-Write']

    useEffect(() => {

        if(defaultPermissions && defaultPermissions.length > 0){
            setPermissions([...defaultPermissions])
        }

    }, [])

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
                    multiSelections={permissions}
                    setMultiSelections={setPermissions}
                />

            </div>
        
        </>
    )


    const handleSubmit = (e) => {
        e.preventDefault();

        let body = {
            name: roleType,
            permissions: permissions
        }

        console.log(body)

        getEventApi(localStorage.getItem('token')).put(`/${eventId}/role`, body).then((res)=>{

            console.log(res.data.event)
            setPermissions([])
            setModalShow(false)
            setEvent(res.data.event)

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