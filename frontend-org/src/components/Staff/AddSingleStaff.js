import '../../styles/AddStaff.css'
import { useState } from 'react'
import FormInput from "../Form/FormInput";
import FormButton from '../Form/FormButton';
import {FaAngleDown, FaAngleRight} from 'react-icons/fa'



const AddSingleStaff = ({staffNo, name, email, role, setName, setEmail, setRole}) => {
    const [display, setDisplay] = useState('block');

    const changeVisibility = () => {
        if(display == 'block'){
            setDisplay('none')
        }
        else{
            setDisplay('block')
        }
    }
  
    return ( 
        <>

            <div className='icon_flexbox'>
                {
                    display == 'block' ? (
                        <FaAngleDown className='icon-arrow' onClick={changeVisibility}/>

                    ) : (
                        <FaAngleRight className='icon-arrow' onClick={changeVisibility}/>
                    )
                }


                <h4 className='staff-header'> Staff {staffNo} </h4>

            </div>

            <form style={{display: `${display}`, marginBottom: '70px'}}>

                <FormInput id="name"
                    inputType="text"
                    label="Name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={setName}
                />

                <br />

                <FormInput id="email"
                    inputType="email"
                    label="Email"
                    placeholder="Enter email"
                    value={email}
                    onChange={setEmail}
                />

                <br />

                <FormInput id="role"
                    inputType="text"
                    label="Role"
                    placeholder="Assign a role"
                    value={role}
                    onChange={setRole}
                />

            </form>

        </>
        
     );
}
 
export default AddSingleStaff;


