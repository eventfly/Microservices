import { useState } from 'react'
import Router from "next/router";

import FormInput from "../components/Form/FormInput";
import FormTitle from "../components/Form/FormTitle";
import FormButton from "../components/Form/FormButton";

import useRequest from "../hooks/use-request";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { doRequest, errors } = useRequest({
        url: "/api/users/signin",
        method: "post",
        body: {
            email, password
        }, onSuccess: () => Router.push("/")
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("email: ", email);
        console.log("password: ", password);

        doRequest()
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

                <FormButton type="submit" buttonText="Log in" />

            </form>


        </div>

    );
}

export default Login;