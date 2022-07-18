import EventSidebar from "../components/EventSidebar";

import { useState } from 'react'
import FormTitle from "../components/Form/FormTitle";
import '../styles/AddStaff.css'
import FormButton from "../components/Form/FormButton";
import FormInput from "../components/Form/FormInput";

const AddStaff = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("name: ", name);
        console.log("email: ", email);
        console.log("role: ", role);

        let staff = {
            name, email, role
        }

        console.log(staff)


        // axios.post('/api/org/', account).then(res => {
        //     console.log(res)
        // }).catch(err => {
        //     console.log(err)
        // })
    }

        
    return ( 
        <>
            <EventSidebar/>

            <div className="content">

            <div className="title">
                    <FormTitle title="Add New Staff" />
            </div>


            <form onSubmit={handleSubmit}>

                <FormInput id="name"
                    inputType="text"
                    label="Name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={setName}
                />

                <br/>

                <FormInput id="email"
                    inputType="email"
                    label="Email"
                    placeholder="Enter email"
                    value={email}
                    onChange={setEmail}
                />

                <br/>

                <FormInput id="role"
                    inputType="text"
                    label="Role"
                    placeholder="Assign a role"
                    value={role}
                    onChange={setRole}
                />

                <div className="button_style">
                    <FormButton type="submit" buttonText="Add" />    
                </div>
                
            </form>

            </div>

        </>
        
     );
}
 
export default AddStaff;


