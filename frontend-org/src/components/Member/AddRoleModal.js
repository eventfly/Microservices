import { useState } from 'react';
import FormInput from '../Form/FormInput';
import FormButton from '../Form/FormButton';
import FormSelect from '../Form/FormSelect';
import PopupModal from '../PopupModal';
import AutoComplete from '../AutoComplete'
import {MdOutlineGroupAdd} from 'react-icons/md'


const AddRoleModal = () => {

    const [newRole, setNewRole] = useState('Default');
    const [modalShow, setModalShow] = useState(false);
    const [permissions, setPermissions] = useState([]);

    const permitOptions = ['Admin', 'Edit Role', 'Read Only', 'Read-Write']

    const roleOptions = [
        {
            'id': 1,
            'name': 'Speakers'
        },
        {
            'id': 2,
            'name': 'Receptionists'
        },
        {
            'id': 3,
            'name': 'Social Media Managers'
        },
        {
            'id': 4,
            'name': 'Distributors'
        },
        {
            'id': 5,
            'name': 'Default'
        }
    ]

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
            role: newRole,
            permissions: permissions
        }

        console.log(body)
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