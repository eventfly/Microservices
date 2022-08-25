import { useNavigate } from 'react-router-dom';

import FormInput from "../components/Form/FormInput";
import FormTitle from "../components/Form/FormTitle";
import FormButton from "../components/Form/FormButton";
import FormSelect from "../components/Form/FormSelect";
import ErrorPopup from "../components/ErrorPopup";
import PersonCard from '../components/PersonCard';

import { useState, useEffect } from 'react'
import StaffProfile from '../components/Profile/StaffProfile';
import OrgProfile from '../components/Profile/OrgProfile';

import "../styles/Profile.css"


const Profile = () => {

    const navigate = useNavigate();

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }
    let token = localStorage.getItem('token')

    let accTypeOptions = [
        {
            'id': 1,
            'name': 'Organizer'
        },
        {
            'id': 2,
            'name': 'Staff'
        }
    ]

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [accType, setAccType] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        if(!auth && !token){
            navigate('/login')
        }

        if (auth && auth.ref_id && loading == false){

            setEmail(auth.email)
            setName(auth.name)
            setAccType(auth.role)
            setLoading(true)

        }
    }, [auth, email, loading])


    const handleSubmit = (e) => {}

    return ( 

        auth && <>
        
            {auth.role == 'Organizer' || auth.role == 'Manager' ? <OrgProfile /> : <StaffProfile /> }
            
        
        </>

    );
}
 
export default Profile;