import { useNavigate } from 'react-router-dom';

import FormInput from "../Form/FormInput";
import FormTitle from "../Form/FormTitle";
import FormButton from "../Form/FormButton";
import ErrorPopup from "../ErrorPopup";
import PersonCard from '../PersonCard';

import { useState, useEffect } from 'react'
import {authApi} from '../../api/axiosHook'

import "../../styles/Profile.css"


const StaffProfile = () => {

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
        
            <div className="profile">

                <FormTitle title="Profile" />

                <div className="profile_flexbox">

                    <div className="left-column">
                        
                        <PersonCard name={name} email={email} role={accType} />

                    </div>

                    <div className="right-column">

                        <form onSubmit={handleSubmit}>

                        <FormInput id="name"
                            inputType="text"
                            label="Name"
                            placeholder="Enter name"
                            value={name}
                            isDisabled={true}
                            onChange={setName}
                        />
                        
                        <FormInput id="email"
                            inputType="email"
                            label="Email"
                            placeholder="Enter email"
                            value={email}
                            isDisabled={true}
                            onChange={setEmail}
                        />

                        <FormInput id="role"
                            inputType="text"
                            label="Role"
                            placeholder="Enter role"
                            value={accType}
                            isDisabled={true}
                            onChange={setAccType}
                        />

                        <br/>

                        <FormButton type="submit" buttonText="Save" />

                        </form>

                    </div>

                </div>

                {
                    error != null ? (
                        <ErrorPopup error={error} setError={setError} />
                    ) : (<></>)
                }

            </div>
        
        </>

    );
}
 
export default StaffProfile;