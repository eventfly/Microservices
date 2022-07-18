import '../../styles/AddStaff.css'
import { useState } from 'react'

import FormTitle from "../Form/FormTitle";
import FormInput from "../Form/FormInput";
import FormButton from '../Form/FormButton';

const AddSingleStaff = ({handleSubmit}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
        
    return ( 
        <>
            <div className="content">

                <div className="title">
                        <FormTitle title="Add New Staff" />
                </div>


                <form onSubmit={()=> handleSubmit()}>

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

                    <FormButton type="submit" buttonText="Sign up" />
                </form>
            
            </div>



        </>
        
     );
}
 
export default AddSingleStaff;


