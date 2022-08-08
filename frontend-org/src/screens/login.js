import { useNavigate } from 'react-router-dom';

import FormInput from "../components/Form/FormInput";
import FormTitle from "../components/Form/FormTitle";
import FormButton from "../components/Form/FormButton";
import FormSelect from "../components/Form/FormSelect";
import ErrorPopup from "../components/ErrorPopup";

import { useState, useEffect } from 'react'
import {authApi} from '../api/axiosHook'
import { useSearchParams } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }

    let url = window.location.toString();
    let params = url?.split("?")[1]?.split("&");


    let accTypeOptions = [
        {
            'id': 2,
            'name': 'staff'
        },
        {
            'id': 1,
            'name': 'organizer'
        },
    ]

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accType, setAccType] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() =>{
        if (auth == null && loading == false){

            console.log("useeffect")

            if(params && params.length == 2){
                
                redirectConfirmation(params[0].split('%22')[1], params[1].split('%22')[1])
            }

            setLoading(true)

        }
    }, [email, loading])


    const redirectConfirmation = (e, p) => {
        
        authApi.post('/org/signin', {
            email: e,
            password: p,
            role: 'staff'
        })
        .then(res => {
            console.log(res)

            window.localStorage.setItem('token', res.data.token);
            window.sessionStorage.setItem('auth', JSON.stringify(res.data.existingUser));
            navigate('/profile')

        }).catch(err => {
            console.log(err)
            setError(err.response.data.errors[0].message);
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("email: ", email);
        console.log("password: ", password);
        console.log("accountType: ", accType);

        authApi.post('/org/signin', {
            email,
            password,
            role: accType
        })
        .then(res => {
            console.log(res)
            
            // Stores the JWT token in the browser's local storage
            window.localStorage.setItem('token', res.data.token);
            window.sessionStorage.setItem('auth', JSON.stringify(res.data.existingUser));
            navigate('/profile')

        }).catch(err => {
            console.log(err)
            setError(err.response.data.errors[0].message);
        })
    }

    return (

        <div className="no_auth_page_style">

            <FormTitle title="Login" />

            <form onSubmit={handleSubmit}>

                <FormInput id="email"
                    inputType="email"
                    label="Email"
                    placeholder="Enter email"
                    value={email}
                    onChange={setEmail}
                />

                <FormInput id="password"
                    inputType="password"
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    onChange={setPassword}
                />

                <FormSelect id="account"
                    label="Account Type"
                    options={accTypeOptions}
                    onChange={setAccType}
                />

                <br/>

                <FormButton type="submit" buttonText="Log in" />

            </form>

            {
                error != null ? (
                    <ErrorPopup error={error} setError={setError} />
                ) : (<></>)
            }

        </div>

    );
}

export default Login;