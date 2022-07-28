import EventSidebar from "../components/EventSidebar";
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react'
import FormTitle from "../components/Form/FormTitle";
import FormButton from '../components/Form/FormButton';
import '../styles/AddStaff.css'
import AddSingleStaff from "../components/Staff/AddSingleStaff";
import {orgApi} from '../api/axiosHook'
import ErrorPopup from "../components/ErrorPopup";

const AddStaff = () => {

    const [name, setName] = useState([''])
    const [email, setEmail] = useState([''])
    const [role, setRole] = useState(['staff'])

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [staffForms, setStaffForms] = useState([{'id' : 1}])

    const updateNameByIndex = (idx, value) => {
        name[idx] = value

        setName([
            ...name.slice(0, idx),
            name[idx],
            ...name.slice(idx + 1, name.length)
        ]);
    }

    const updateEmailByIndex = (idx, value) => {
        email[idx] = value

        setEmail([
            ...email.slice(0, idx),
            email[idx],
            ...email.slice(idx + 1, email.length)
        ]);
    }

    const updateRoleByIndex = (idx, value) => {
        role[idx] = value

        setRole([
            ...role.slice(0, idx),
            role[idx],
            ...role.slice(idx + 1, role.length)
        ]);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        let allStaffs = []

        for(let i = 0; i < staffForms.length; i++){
            allStaffs.push({
                'name': name[i],
                'email': email[i],
                'role': role[i]
            })
        }

        console.log(allStaffs)

        for(let i = 0; i < staffForms.length; i++){
            orgApi.post('/staff', allStaffs[i]).then(res => {
                console.log(res)
                navigate('/detail/staff')
    
            }).catch(err => {
                console.log(err)
                setError(err.response.data.errors[0].message);
            })
        }

        
    }


    const onAddNewStaff = () => {
        setStaffForms(staffForms => [...staffForms, {'id': staffForms.length+1}])
        setName(name => [...name, ''])
        setEmail(email => [...email, ''])
        setRole(role => [...role, 'staff'])
    }

    return (
        <>

            <div className="detail_flexbox">

                <div className="left-column">
                    <EventSidebar/>
                </div>

                <div className="right-column">

                    <div className="content">
                        <div className="title">
                            <FormTitle title="Add New Staff" />
                        </div>

                        <div className="add-more-btn">

                            <FormButton type="button" buttonText="+ Add New Staff" onClick={onAddNewStaff} />

                        </div>


                        {staffForms.map((staffForm, index)=>{
                            return(
                                <div className="add-single-staff" key={index}>
                                    <AddSingleStaff
                                        staffNo={staffForm.id}  
                                        name={name[staffForm.id-1]} 
                                        setName={(value)=>updateNameByIndex(staffForm.id-1, value)}
                                        email={email[staffForm.id-1]} 
                                        setEmail={(value)=>updateEmailByIndex(staffForm.id-1, value)}
                                        role={role[staffForm.id-1]} 
                                        setRole={(value)=>updateRoleByIndex(staffForm.id-1, value)}
                                    />
                                </div>
                            )
                        })}

                        <div className="add_staff_button">

                            <FormButton 
                                type="submit" 
                                buttonText="Add" 
                                bgColor={'#0E7617'}
                                onClick={handleSubmit} 
                            />

                        </div>
                    
                    </div>

                </div>
            
            </div>

            {
                error != null ? (
                    <ErrorPopup error={error} setError={setError} />
                ) : (<></>)
            }

        </>

    );
}

export default AddStaff;


