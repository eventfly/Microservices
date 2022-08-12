import EventSidebar from "../components/EventSidebar";
import '../styles/EventMember.css'
import Role from '../components/Member/Role'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import AddRoleModal from "../components/Member/AddRoleModal";

const EventMember = ({managers, staffs, setLoading}) => {

    useEffect(() => {

        setLoading(false)

    }, [])
        
    return ( 
        <>
            <div className="role-header">

                <h2>Roles</h2>
                <AddRoleModal />

            </div>

            <div className="role-container">
                <Role 
                    roleType='Managers' 
                    members={managers}
                    setLoading={setLoading}
                />
            </div>

            <div className="role-container">
                <Role 
                    roleType='Default' 
                    members={staffs}
                    setLoading={setLoading}
                />
            </div>



        </>
        
     );
}
 
export default EventMember;


