import { useNavigate } from 'react-router-dom';

import FormInput from "../components/Form/FormInput";
import FormTitle from "../components/Form/FormTitle";
import FormButton from "../components/Form/FormButton";
import FormSelect from "../components/Form/FormSelect";
import ErrorPopup from "../components/ErrorPopup";
import PersonCard from '../components/PersonCard';

import { useState, useEffect } from 'react'
import {authApi} from '../api/axiosHook'
import MapNew from '../components/Event/MapNew';

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
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

    const mapIsReadyCallback = (map) => {
        //var lngLat = map.getLngLat();
        //console.log('Longitude: ' + lngLat.lng + ', Latitude: ' + lngLat.lat )
      };


    return ( 

        auth && <>
        
            <div className="profile">

                <FormTitle title="Profile" />

                <div className="profile_flexbox">

                    <div className="left-column">
                        
                        <PersonCard name={name} email={email} role={accType} />
                        {/* <MapNew mapIsReadyCallback={mapIsReadyCallback}/> */}

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

                        {/* <FormInput id="password"
                            inputType="password"
                            label="Password"
                            placeholder="Enter password"
                            value={password}
                            onChange={setPassword}
                        />

                        <FormInput id="new-password"
                            inputType="password"
                            label="New Password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={setNewPassword}
                        />

                        <FormInput id="confirm_password"
                            inputType="password"
                            label="Confirm Password"
                            placeholder="Enter password again"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                        /> */}

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
 
export default Profile;