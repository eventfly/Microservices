import { useState, useEffect } from 'react';
import FormSelect from '../Form/FormSelect';
import PopupModal from '../PopupModal';
import AutoComplete from '../AutoComplete'
import {MdOutlineGroupAdd} from 'react-icons/md'
import {getEventApi, getOrgApi} from '../../api/axiosHook'


const AddRoleModal = ({id, setData, roleOptions, apiCallRoute, display}) => {

    // const [newRole, setNewRole] = useState(roleOptions.length > 0 ? roleOptions[0].name : '');
    const [modalShow, setModalShow] = useState(false);
    const [permissions, setPermissions] = useState([]);

    const [permitOptions, setPermitOptions] = useState(['Admin', 'Edit Role', 'Read Only', 'Read-Write']);
    const [newRoleOptions, setNewRoleOptions] = useState([]);
    const [newRole, setNewRole] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedRole, setSelectedRole] = useState(roleOptions.length > 0 ? roleOptions[0].name : '');


    useEffect(()=>{

        if(loading == false){
            setLoading(true)
            console.log("roles : ", roleOptions)
            setNewRoleOptions([...roleOptions])
        }

    }, [loading, roleOptions])

    const modalJSX = (
        <>
        
            <div style={{marginBottom: '20px'}}>

                {
                    apiCallRoute == 'org' ? (
                        <AutoComplete
                            label={'Role'}
                            placeholder={'Choose a role'}
                            options={newRoleOptions ? newRoleOptions: []}
                            setOptions={setNewRoleOptions}
                            multiSelections={newRole}
                            setMultiSelections={setNewRole}
                            isNewItemsAllowed={true}
                            isMultiple={false} 
                        />
                    
                    ) : (
                        <FormSelect id="type"
                            label="Role"
                            options={roleOptions}
                            defaultValue={selectedRole}
                            onChange={setSelectedRole}
                        />

                    )
                }

                
                <div style={{display: `${display}`}}>
                    <div style={{marginTop: '30px'}}></div>

                    <AutoComplete
                        label={'Permissions'}
                        placeholder={'Allow several permissions'}
                        options={permitOptions}
                        setOptions={setPermitOptions}
                        multiSelections={permissions}
                        setMultiSelections={setPermissions}
                        isNewItemsAllowed={true}
                        isMultiple={true} 
                    />

                </div>

            </div>
        
        </>
    )


    const handleSubmit = (e) => {
        e.preventDefault();

        let body;

        if(apiCallRoute == 'org'){
            body = {
                name: newRole[0],
                permissions: permissions
            }
        }
        else if(apiCallRoute == 'events'){
            body = {
                name: selectedRole,
                permissions: roleOptions.filter((opt)=>{
                    return opt.name == selectedRole
                })[0].permissions
            }
        }

        console.log(body)

        let api = getOrgApi

        if(apiCallRoute == 'events'){
            api = getEventApi
        }

        api(localStorage.getItem('token')).post(`/${id}/role`, body).then((res)=>{

            setNewRole('')
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

            <MdOutlineGroupAdd 
                className="add-role-icon" 
                onClick={() => setModalShow(true)}
                style={{
                    display: roleOptions.length > 0 ? 'block' : 'none'
                }} 
            />

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