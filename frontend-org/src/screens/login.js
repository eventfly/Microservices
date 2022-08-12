import { useNavigate } from 'react-router-dom';

import FormInput from "../components/Form/FormInput";
import FormTitle from "../components/Form/FormTitle";
import FormButton from "../components/Form/FormButton";
import FormSelect from "../components/Form/FormSelect";
import ErrorPopup from "../components/ErrorPopup";

import { useState, useEffect } from 'react'
import {getAuthApi} from '../api/axiosHook'

const Login = () => {
    const navigate = useNavigate();

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }

    let query = window.location.search
    let urlparams = new URLSearchParams(query)

    let accTypeOptions = [
        {
            'id': 1,
            'name': 'organizer'
        },
        {
            'id': 2,
            'name': 'staff'
        }
    ]

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accType, setAccType] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const postToLoginApi = (emailVal, passwordVal, roleVal) => {

        getAuthApi('').post('/org/signin', {
            email: emailVal,
            password: passwordVal,
            role: roleVal
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


    useEffect(() =>{
        if (auth == null && loading == false){

            if(urlparams.get("email")){
                
                const emailFromQuery = urlparams.get("email");
                const passwordFromQuery = urlparams.get("password")
                console.log(emailFromQuery, passwordFromQuery)
                postToLoginApi(emailFromQuery, passwordFromQuery, 'staff')
            }

            setLoading(true)

        }
    }, [email, loading])


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("email: ", email);
        console.log("password: ", password);
        console.log("accountType: ", accType);

        postToLoginApi(email, password, accType)

        // authApi.post('/org/signin', {
        //     email,
        //     password,
        //     role: accType
        // })
        // .then(res => {
        //     console.log(res)
            
        //     window.localStorage.setItem('token', res.data.token);
        //     window.sessionStorage.setItem('auth', JSON.stringify(res.data.existingUser));
        //     navigate('/profile')

        // }).catch(err => {
        //     console.log(err)
        //     setError(err.response.data.errors[0].message);
        // })
    }

    return (

        <div className="no_auth_page_style">

            {
                urlparams.get("email") ? (<></>) : (

                <>

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

                </>
            )
        }

        </div>

    );
}

export default Login;