import FormInput from "../components/Form/FormInput";
import FormTitle from "../components/Form/FormTitle";
import FormButton from "../components/Form/FormButton";
import FormSelect from "../components/Form/FormSelect";
import FormDatePicker from "../components/Form/FormDatePicker";
import {useState} from 'react'

const Signup = () => {

    let options = [
        {
            'id': 1,
            'name': 'Male'
        },
        {
            'id': 2,
            'name': 'Female'
        }
    ]

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDOB] = useState(new Date());

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("name: ", name);
        console.log("email: ", email);
        console.log("password: ", password);
        console.log("gender: ", gender);
        console.log("dob: ", dob.toLocaleDateString());

        setName('')
        setEmail('')
        setPassword('')
        setGender('')
        setDOB(new Date())
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

                <FormSelect id="gender" 
                    label="Gender" 
                    options={options}
                    onChange={setGender}
                />
                <FormDatePicker id="dob" startDate={dob} onChange={setDOB}/>

                <FormButton type="submit" buttonText="Sign up" />

            </form>
        
        </div>

    );
}
 
export default Signup;