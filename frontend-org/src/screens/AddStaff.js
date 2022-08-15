import EventSidebar from "../components/EventSidebar";
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { useEffect, useState } from 'react'
import FormTitle from "../components/Form/FormTitle";
import FormButton from '../components/Form/FormButton';
import '../styles/AddStaff.css'
import AddSingleStaff from "../components/Member/AddSingleStaff";
import {getOrgApi} from '../api/axiosHook'
import ErrorPopup from "../components/ErrorPopup";

const AddStaff = () => {

    const [name, setName] = useState([''])
    const [email, setEmail] = useState([''])
    const [role, setRole] = useState(['staff'])

    const navigate = useNavigate();
    const [status, setStatus] = useState(['unverified']);

    const [staffForms, setStaffForms] = useState([{'id' : 1}])
    const { eventId } = useParams();

    const location = useLocation()
    const { roleType } = location.state


    useEffect(() => {
        //console.log(status)
    
    }, [status])

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

    const removeStaffByIndex = (idx) => {
        console.log('removing staff ', idx)

        for(let i = idx+1; i < staffForms.length; i++){
            staffForms[i] = {'id': i}
        }

        setStaffForms([
            ...staffForms.slice(0, idx),
            ...staffForms.slice(idx+1, staffForms.length)
        ])

        setStatus([
            ...status.slice(0, idx),
            ...status.slice(idx+1, status.length)
        ])

        setName([
            ...name.slice(0, idx),
            ...name.slice(idx + 1)
        ]);

        setEmail([
            ...email.slice(0, idx),
            ...email.slice(idx + 1, email.length)
        ]);

        setRole([
            ...role.slice(0, idx),
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
                'role': roleType,
                'events': [eventId]
            })
        }

        console.log(allStaffs)

        for(let i = 0; i < staffForms.length; i++){

            if(status[i] != "success"){

                getOrgApi(localStorage.getItem('token')).post('/staff', allStaffs[i]).then(res => {
                    console.log(res)
                    status[i] = 'success'
                    setStatus([
                        ...status.slice(0, i),
                        status[i],
                        ...status.slice(i + 1, status.length)
                    ]);

                    let failedForms = status.filter((st)=>{
                        return st !== 'success'
                    })

                    console.log("failed", failedForms.length)

                    if(failedForms.length == 0){
                        navigate(`/event/${eventId}/members`)
                    }
        
                }).catch(err => {
                    console.log(err)

                    status[i] = 'error'
                    setStatus([
                        ...status.slice(0, i),
                        status[i],
                        ...status.slice(i + 1, status.length)
                    ]);
                    //setError(err.response.data.errors[0].message);
                })
            }
        }
    }


    const onAddNewStaff = () => {
        setStaffForms(staffForms => [...staffForms, {'id': staffForms.length+1}])
        setStatus(status => [...status, 'unverified'])
        setName(name => [...name, ''])
        setEmail(email => [...email, ''])
        setRole(role => [...role, 'staff'])
    }

    return (
        <>

            <div className="content">
                {/* <div className="title">
                    <FormTitle title="Add New Staff" />
                </div> */}

                <div className="add-more-btn">

                    <FormButton type="button" buttonText="+ Add New Staff" onClick={onAddNewStaff} />

                </div>


                {staffForms.map((staffForm, index)=>{
                    return(
                        <div className="add-single-staff" key={index}>
                            <AddSingleStaff
                                roleType={roleType}
                                staffNo={staffForm.id}  
                                name={name[staffForm.id-1]} 
                                setName={(value)=>updateNameByIndex(staffForm.id-1, value)}
                                email={email[staffForm.id-1]} 
                                setEmail={(value)=>updateEmailByIndex(staffForm.id-1, value)}
                                // role={role[staffForm.id-1]} 
                                // setRole={(value)=>updateRoleByIndex(staffForm.id-1, value)}
                                status={status[[staffForm.id-1]]}
                                removeStaff={(val)=>removeStaffByIndex(staffForm.id-1)}
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

        </>

    );
}

export default AddStaff;


