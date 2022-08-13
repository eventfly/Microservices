import { useNavigate } from 'react-router-dom';

import FormInput from "../../Form/FormInput";
import FormTitle from "../../Form/FormTitle";
import FormButton from "../../Form/FormButton";
import ErrorPopup from "../../ErrorPopup";
import PersonCard from '../../PersonCard';

import { useState, useEffect } from 'react'
import {orgApi} from '../../../api/axiosHook'

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import DatePicker from '../../Event/DatePicker';


const OrgAccount = () => {

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

    const [email, setEmail] = useState('yahoo@google');
    const [name, setName] = useState('');
    const [accType, setAccType] = useState('');

    const [phonenumber, setPhonenumber] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState('');

    const uploadImage = (e) => {
        const file = e.target.files[0];
        const storage = getStorage();
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                console.log("Loading");
            },
            (error) => {
                console.log("Error");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    console.log(downloadUrl);
                    setProfileImage(downloadUrl);
                    sessionStorage.setItem("orgProfilePic", downloadUrl);
                    // document.getElementById("banner").style.backgroundImage = `url(${downloadUrl})`;
                })
            }
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handleSubmit')
        console.log(date)
    }

    const [date, setDate] = useState("2017-06-01T08:30");

    return (  
        <>
            <FormTitle title="Account" />

            <div className="profile_flexbox">

                <div className="left-column">
                    
                    <PersonCard 
                        name={name} 
                        email={email} 
                        role={accType}
                        uploadImage={uploadImage}
                        profilePic={profileImage} 
                    />

                </div>

                <div className="right-column">

                    <form onSubmit={handleSubmit}>

                    <FormInput id="name"
                        inputType="text"
                        label="Name"
                        placeholder="Enter name"
                        value={name}
                        onChange={setName}
                    />
                    
                    <FormInput id="email"
                        inputType="email"
                        label="Email"
                        placeholder="Enter email"
                        value={email}
                        isDisabled={true}
                        onChange={setEmail}
                    />
                    
                    <FormInput id="phonenumber"
                        inputType="number"
                        label="Contact Number"
                        placeholder="Enter contact number"
                        value={phonenumber}
                        isDisabled={false}
                        onChange={setPhonenumber}
                    />

                    <FormInput id="role"
                        inputType="text"
                        label="Role"
                        placeholder="Enter role"
                        value={accType}
                        isDisabled={true}
                        onChange={setAccType}
                    />

                    <DatePicker label="Joined On" onChange={setDate} isDisabled={true} defaultDate={date}/>

                    <br/>

                    <FormButton type="submit" buttonText="Save" />
                    

                    </form>

                </div>

            </div>
        </>
    );
}
 
export default OrgAccount;