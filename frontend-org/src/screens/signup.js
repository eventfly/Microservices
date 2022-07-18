import FormInput from "../components/Form/FormInput";
import FormTitle from "../components/Form/FormTitle";
import FormButton from "../components/Form/FormButton";
import FormSelect from "../components/Form/FormSelect";
import { useState } from 'react'
import axios from 'axios';

const Signup = () => {

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


        axios.post('/api/org/', account).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })

        // setName('')
        // setEmail('')
        // setPassword('')
        // setAccType('')
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

                <FormButton type="submit" buttonText="Sign up" />

            </form>

        </div>

    );
}

export default Signup;