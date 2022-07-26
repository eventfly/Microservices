import { useNavigate } from 'react-router-dom';

import FormInput from "../components/Form/FormInput";
import FormTitle from "../components/Form/FormTitle";
import FormButton from "../components/Form/FormButton";
import FormSelect from "../components/Form/FormSelect";
import { useState } from 'react'
import ErrorPopup from "../components/ErrorPopup";
import {orgApi} from '../api/axiosHook'

import '../styles/Form.css'

const Signup = () => {

    const navigate = useNavigate();

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

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accType, setAccType] = useState('');

    // const [show, setShow] = useState(false);
    const [error, setError] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("name: ", name);
        console.log("email: ", email);
        console.log("password: ", password);
        console.log("accountType: ", accType);

        let account = {
            name, email, password,
            role: accType,
        }

        console.log(account)


        orgApi.post('/', account).then(res => {
            console.log(res)
            navigate('/')
        
        }).catch(err => {
            console.log(err)
            // setShow(true);
            setError(err.response.data.errors[0].message);
        })

    }


    return (

        <div className="no_auth_page_style">

            <FormTitle title="Sign up" />

            <form onSubmit={handleSubmit}>

                <FormInput id="name"
                    inputType="text"
                    label="Name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={setName}
                />

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

                <FormButton type="submit" buttonText="Sign up" />

            </form>

            {
                error != null ? (
                    <ErrorPopup error={error} setError={setError} />
                ) : (<></>)
            }


        </div>

    );
}

export default Signup;