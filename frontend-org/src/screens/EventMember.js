import EventSidebar from "../components/EventSidebar";
import '../styles/EventMember.css'
import Role from '../components/Member/Role'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import AddRoleModal from "../components/Member/AddRoleModal";

const EventMember = ({event, setEvent, managers, setLoading}) => {

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }

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


    const getStaffsByRole = (role) => {
        let tempStaffs = event.staffs.filter((staff)=>{
            return staff.role === role.name
        })

        return tempStaffs
    }

    const getRoleOptions = () => {
        let tempOptions = roleOptions

        if(event){
            event.roles.map((role) => {
                tempOptions = tempOptions.filter((opt)=>{
                    return opt.name !== role.name
                })

            });
        }

        return tempOptions
    }

    useEffect(() => {
        setLoading(false)
    
    }, [])

        
    return ( 
        <>
            <div className="role-header">

                <h2>Roles</h2>

                {
                    (auth && (auth.role === 'Organizer' || auth.role === 'Manager')) ? (
                        <AddRoleModal 
                            eventId={event ? event.ref_id : ''} 
                            setEvent={setEvent}
                            roleOptions={getRoleOptions()}
                        />
                    ) : (
                        <></>
                    )
                }

            </div>

            <div className="role-container">
                <Role 
                    roleType='Managers'
                    setEvent={setEvent} 
                    members={managers}
                />
            </div>

            <div className="role-container">
                {
                    event && event.roles.map((role, index)=>{
                        return (
                            <Role
                                key={index} 
                                roleType={role.name}
                                permissions={role.permissions}
                                setEvent={setEvent} 
                                members={event ? getStaffsByRole(role) : null}
                            />
                        )
                    })
                }
            </div>



        </>
        
     );
}
 
export default EventMember;


