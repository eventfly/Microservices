import FormInput from "../components/Form/FormInput";
import FormTitle from "../components/Form/FormTitle";
import FormButton from "../components/Form/FormButton";
import FormSelect from "../components/Form/FormSelect";

import { useState } from 'react'
import axios from 'axios';


const Login = () => {

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("email: ", email);
        console.log("password: ", password);
        console.log("accountType: ", accType);

        setEmail('')
        setPassword('')
        setAccType('')

        axios.post('http://localhost:3000/api/auth/org/signin', {
            email,
            password,
            role: accType
        }, {
            headers: {
               authorization: ' xxxxxxxxxx' ,
               'Content-Type': 'application/json'
            } 
         }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
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

        </div>

    );
}

export default Login;