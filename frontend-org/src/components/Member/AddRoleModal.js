import { useState } from 'react';
import FormInput from '../Form/FormInput';
import FormButton from '../Form/FormButton';


const AddRoleModal = () => {

    const [newRole, setNewRole] = useState('');

    return ( 

        <>

            <div className='add-role-modal'>

                <FormInput id="role-name"
                    inputType="text"
                    label="New Role"
                    placeholder="Enter the name of role"
                    value={newRole}
                    isDisabled={true}
                    onChange={setNewRole}
                />

            </div>

        </>

    );
}
 
export default AddRoleModal;