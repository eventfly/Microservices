import FormInput from "../components/Form/FormInput";
import FormTitle from "../components/Form/FormTitle";
import FormButton from "../components/Form/FormButton";

import {useState} from 'react'


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("email: ", email);
        console.log("password: ", password);

        setEmail('')
        setPassword('')
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