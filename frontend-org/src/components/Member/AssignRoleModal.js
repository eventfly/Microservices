import { useState, useEffect } from 'react';
import FormInput from '../Form/FormInput';
import PopupModal from '../PopupModal';
import AutoComplete from '../AutoComplete'
import {MdOutlinePersonAdd} from 'react-icons/md'
import {getEventApi} from '../../api/axiosHook'

const AssignRoleModal = ({id, setData, roleType, staffsToBeAssigned}) => {

    const [modalShow, setModalShow] = useState(false);
    const [staffs, setStaffs] = useState([]);

    const [options, setOptions] = useState([]);

    const getOptions = () => {

        // filter by role
        let tempOptions = staffsToBeAssigned.filter((st)=>{
            if(roleType != 'Default'){
                return st.role == roleType.slice(0, -1)
            }
            else{
                return st.role == roleType
            }
        })

        tempOptions = tempOptions.map((opt)=>{
            return opt.email
        })

        return tempOptions
    }

    useEffect(() => {


    }, [staffsToBeAssigned])

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
                    label={'Staffs'}
                    placeholder={'Choose Staffs'}
                    options={staffsToBeAssigned ? getOptions() : []}
                    setOptions={setOptions}
                    multiSelections={staffs}
                    setMultiSelections={setStaffs}
                    isNewItemsAllowed={false}
                />

            </div>
        
        </>
    )


    const handleSubmit = (e) => {
        e.preventDefault();

        let staffData = []

        for(let i = 0; i < staffs.length; i++){

            let matchedStaff = staffsToBeAssigned.filter((st)=>{
                return st.email == staffs[i]
            })[0]

            let body = {
                name: matchedStaff.name,
                email: matchedStaff.email,
                role: roleType == 'Default' ? roleType : roleType.slice(0, -1),
                profile_pic: matchedStaff.profile_pic,
                ref_id: matchedStaff.id 
            }

            staffData.push(body)
        }

        console.log(staffData)

        getEventApi(localStorage.getItem('token')).put(`/${id}/assign-staff`, staffData).then((res)=>{
            setStaffs([])
            setModalShow(false)

            console.log(res.data.event)
            setData(res.data.event)

        }).catch((err)=>{
            console.log(err.response.data.errors)
        })
    }


    return ( 

        <>
            <MdOutlinePersonAdd className="add-member-icon" onClick={() => setModalShow(true)} />

            <PopupModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                header="Assign Staffs"
                bodyComponent={modalJSX}
                saveButtonText={"Save Changes"}
                saveButtonAction={handleSubmit}
                size="md"
            />

        </>

    );
}
 
export default AssignRoleModal;