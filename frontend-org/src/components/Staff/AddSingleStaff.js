import '../../styles/AddStaff.css'
import { useState } from 'react'
import FormInput from "../Form/FormInput";
import FormButton from '../Form/FormButton';
import {FaAngleDown, FaAngleRight, FaRegCheckCircle, FaRegTimesCircle} from 'react-icons/fa'



const AddSingleStaff = ({staffNo, name, email, role, setName, setEmail, setRole, status, removeStaff}) => {
    const [display, setDisplay] = useState('block');
    //const [displayForm, setDisplayForm] = useState('block');

    const changeVisibility = () => {
        if(display == 'block'){
            setDisplay('none')
        }
        else{
            setDisplay('block')
        }
    }

    // const hideEntireForm = () => {
    //     if(displayForm == 'block'){
    //         setDisplayForm('none')
    //     }
    //     else{
    //         setDisplayForm('block')
    //     }
    // }

    const formHeader = (
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
                <FaRegTimesCircle className='icon-wrong-header' onClick={removeStaff}/>

            </div> 
        
        </>
    )


    const staffForm = (

        <>
        
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
    )

    const unverifiedUI = (
        <>
        
            {formHeader}
            {staffForm}
        
        </>
    )

    const successUI = (
        <>
            <div className='success'>
                <div className='icon_flexbox'>

                    <FaRegCheckCircle className='icon-check' />
                    <h5 className='staff-header right-text'> Staff {staffNo} has been successfully created </h5>

                </div> 

            </div>
        
        </>
    )
    
    
    const errorUI = (
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
                <h5 className='wrong-text'>Something Wrong !!</h5>
                <FaRegTimesCircle className='icon-wrong'/>


            </div> 
            {staffForm}
        
        </>
    )
    

  
    return ( 
        <>

            {
                status == 'unverified' ? (
                    unverifiedUI
                ) : 
                (
                    status == "success" ? (successUI) 
                    : (
                        errorUI
                    )
                )
            }


        </>
        
     );
}
 
export default AddSingleStaff;


