import { useNavigate } from 'react-router-dom';

import FormInput from "../../Form/FormInput";
import FormTitle from "../../Form/FormTitle";
import FormButton from "../../Form/FormButton";
import ErrorPopup from "../../ErrorPopup";
import PersonCard from '../../PersonCard';

import { useState, useEffect } from 'react'

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import DatePicker from '../../Event/DatePicker';
import {v4 as uuid} from 'uuid'
import {getOrgApi} from '../../../api/axiosHook'



const OrgAccount = ({orgData}) => {

    const navigate = useNavigate();

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }
    
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

    useEffect(() => {
        if(orgData){
            setEmail(orgData.email)
            setName(orgData.name)
            setAccType(orgData.role)
            if(orgData.created_at){
                setDate(orgData.created_at.split(':')[0]+':'+orgData.created_at.split(':')[1])
            }
            setProfileImage(orgData.profile_pic)
        }
    } , [orgData])

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [accType, setAccType] = useState('');

    const [phonenumber, setPhonenumber] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState('');

    const uploadImage = (e) => {
        const avatarImageFile = e.target.files[0];
        const fileNameParts = avatarImageFile.name.split(".");
        const fileExtension = fileNameParts[fileNameParts.length - 1];

        const randomUUID = uuid();
        const avatarImageFileName = `${randomUUID}.${fileExtension}`;
        console.log(avatarImageFileName);

        const storage = getStorage();
        const baseRef = ref(storage, "profile");
        const storageRef = ref(baseRef, avatarImageFileName);
        const uploadTask = uploadBytesResumable(storageRef, avatarImageFile);

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
                    document.getElementById("profilePic").style.backgroundImage = `url(${downloadUrl})`;
                })
            }
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handleSubmit')
        console.log(date)

        let updatedOrg = {
            email,
            name,
            role: accType,
            profile_pic: profileImage,
        }

        getOrgApi(localStorage.getItem('token')).put(`/edit-profile`, updatedOrg).then(res => {
            console.log(res)

            auth.profile_pic = res.data.existingUser.profile_pic
            auth.name = res.data.existingUser.name
            window.sessionStorage.setItem('auth', JSON.stringify(auth));
            alert('Profile updated successfully')
            
        }).catch(err => {
            console.log(err)
            setError(err.response.data.errors[0].message);
        })



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
                    
                    {/* <FormInput id="phonenumber"
                        inputType="number"
                        label="Contact Number"
                        placeholder="Enter contact number"
                        value={phonenumber}
                        isDisabled={false}
                        onChange={setPhonenumber}
                    /> */}

                    <FormInput id="role"
                        inputType="text"
                        label="Role"
                        placeholder="Enter role"
                        value={accType}
                        isDisabled={true}
                        onChange={setAccType}
                    />

                    {
                        auth.role != 'Manager' ? (
                            <DatePicker 
                                label="Joined On" 
                                onChange={setDate} 
                                isDisabled={true} 
                                defaultDate={date}
                            />
                        ) : ( <></>)
                    }
                    
                    <br/>

                    <FormButton type="submit" buttonText="Save" />
                    

                    </form>

                </div>

            </div>
        </>
    );
}
 
export default OrgAccount;