import FormTitle from "../../Form/FormTitle";
import AddRoleModal from "../../Member/AddRoleModal";
import Role from "../../Member/Role";
import { useEffect, useState } from "react";

const OrgMembers = ({orgData, setOrgData, staffs, setStaffs}) => {


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


    useEffect(() => {

        console.log("org data: ", orgData, staffs)

    
    }, [orgData])

    const getStaffsByRole = (role) => {
        let tempStaffs = staffs.filter((staff)=>{
            
            if(role.name != 'Default'){
                return staff.role === role.name.slice(0, -1)
            }
            else return staff.role === role.name
        })

        return tempStaffs
    }

    const getRoleOptions = () => {
        let tempOptions = roleOptions

        if(orgData && orgData.roles){
            orgData.roles.map((role) => {
                tempOptions = tempOptions.filter((opt)=>{
                    return opt.name !== role.name
                })

            });
        }

        // tempOptions = tempOptions.map((opt)=>{
        //     return opt.name
        // })

        return tempOptions
    }

        
    return ( 
        <>
            <div className="role-header">

                <h2>Roles</h2>

                {
                    (orgData && (orgData.role === 'Organizer' || orgData.role === 'Manager')) ? (
                        <AddRoleModal 
                            id={orgData ? orgData.id : ''} 
                            roleOptions={getRoleOptions()}
                            apiCallRoute={'org'}
                            setData={setOrgData}
                        />
                    ) : (
                        <></>
                    )
                }

            </div>

            <div className="role-container">
                <Role 
                    roleType='Managers'
                    orgId={orgData ? orgData.id : ''}
                    setData={setOrgData} 
                    permissions={['Admin']}
                    // members={managers}
                />
            </div>

            <div className="role-container">
                {
                    orgData && orgData.roles && orgData.roles.map((role, index)=>{
                        return (
                            <Role
                                key={index}
                                orgId={orgData ? orgData.id : ''}
                                setData={setOrgData}
                                roleType={role.name}
                                permissions={role.permissions}
                                members={staffs ? getStaffsByRole(role) : null}
                            />
                        )
                    })
                }
            </div>



        </>
        
     );
}
 
export default OrgMembers;