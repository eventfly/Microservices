import EventSidebar from "../components/EventSidebar";
import '../styles/EventMember.css'
import Role from '../components/Member/Role'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import AddRoleModal from "../components/Member/AddRoleModal";

const EventMember = ({event, setEvent, orgRoles, orgStaffs, managers, setLoading}) => {

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
            if(role.name == 'Default'){
                return staff.role === role.name
            }
            else{
                return staff.role === role.name.slice(0, -1)
            }
        })

        return tempStaffs
    }

    const getRoleOptions = () => {
        let tempOptions = roleOptions

        if(event && orgRoles.length > 0){
            tempOptions = orgRoles

            event.roles.map((role) => {
                tempOptions = tempOptions.filter((opt)=>{
                    return opt.name !== role.name
                })

            });

            tempOptions = tempOptions.map((opt)=>{
                return{
                    'id': opt._id,
                    'name': opt.name,
                    'permissions': opt.permissions
                }
            })

            console.log("tempOptions", tempOptions)

        }

        return tempOptions
    }

    useEffect(() => {
        // setLoading(false)
        console.log(orgRoles, orgStaffs)

    }, [orgRoles, orgStaffs])

        
    return ( 
        <>
            <div className="role-header">

                <h2>Roles</h2>

                {
                    (auth && (auth.role === 'Organizer' || auth.role === 'Manager')) ? (
                        <AddRoleModal 
                            id={event ? event.ref_id : ''} 
                            setData={setEvent}
                            roleOptions={getRoleOptions()}
                            apiCallRoute={'events'}
                            display={'none'}
                        />
                    ) : (
                        <></>
                    )
                }

            </div>

            <div className="role-container">
                <Role 
                    roleType='Managers'
                    // setEvent={setEvent} 
                    members={managers}
                    displayEditModal={'none'}
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
                                setData={setEvent} 
                                members={event ? getStaffsByRole(role) : null}
                                displayEditModal={'none'}
                                orgStaffs={orgStaffs ? orgStaffs : []}
                            />
                        )
                    })
                }
            </div>



        </>
        
     );
}
 
export default EventMember;


