import { useNavigate } from 'react-router-dom';

import FormInput from "../components/Form/FormInput";
import FormTitle from "../components/Form/FormTitle";
import FormButton from "../components/Form/FormButton";
import FormSelect from "../components/Form/FormSelect";
import ErrorPopup from "../components/ErrorPopup";

import { useState } from 'react'
import {authApi} from '../api/axiosHook'


const Login = () => {

    const navigate = useNavigate();

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
            // console.log(res.headers)
            // console.log(res.headers['Set-Cookie'])
            navigate('/')

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