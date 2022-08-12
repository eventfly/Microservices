import { useState } from 'react';
import FormInput from '../Form/FormInput';
import FormButton from '../Form/FormButton';
import FormSelect from '../Form/FormSelect';
import PopupModal from '../PopupModal';
import AutoComplete from '../AutoComplete'
import {RiDeleteBin6Line} from 'react-icons/ri'


const DeleteRoleModal = () => {

    const [modalShow, setModalShow] = useState(false);

    const modalJSX = (
        <>
        
            <div style={{marginBottom: '20px', marginTop: '20px'}}>

                <h5> Are you sure to delete this role? </h5>

                {/* <div style={{marginTop: '30px'}}></div> */}


            </div>
        
        </>
    )


    const handleSubmit = (e) => {
        e.preventDefault();

        let body = {

        }

        console.log(body)
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