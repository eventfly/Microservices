import { useState } from 'react';
import FormSelect from '../Form/FormSelect';
import PopupModal from '../PopupModal';
import AutoComplete from '../AutoComplete'
import {MdOutlineGroupAdd} from 'react-icons/md'
import {getEventApi} from '../../api/axiosHook'


const AddRoleModal = ({eventId, setEvent, roleOptions}) => {

    const [newRole, setNewRole] = useState('Default');
    const [modalShow, setModalShow] = useState(false);
    const [permissions, setPermissions] = useState([]);

    const permitOptions = ['Admin', 'Edit Role', 'Read Only', 'Read-Write']

    const modalJSX = (
        <>
        
            <div style={{marginBottom: '20px'}}>

                <FormSelect id="type"
                    label="Role"
                    options={roleOptions}
                    defaultValue={newRole}
                    onChange={setNewRole}
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
            name: newRole,
            permissions: permissions
        }

        console.log(body)

        getEventApi(localStorage.getItem('token')).post(`/${eventId}/role`, body).then((res)=>{

            console.log(res.data.event)
            setNewRole('')
            setPermissions([])
            setModalShow(false)
            setEvent(res.data.event)

        }).catch((err)=>{
            console.log(err.response.data.errors)
        })
    }


    return ( 

        <>

            <MdOutlineGroupAdd className="add-role-icon" onClick={() => setModalShow(true)} />

            <PopupModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                header="Add New Role"
                bodyComponent={modalJSX}
                saveButtonText={"Save"}
                saveButtonAction={handleSubmit}
                size="md"
            />

        </>

    );
}
 
export default AddRoleModal;