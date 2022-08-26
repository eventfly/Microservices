import { useNavigate } from 'react-router-dom';

import FormInput from "../Form/FormInput";
import FormTitle from "../Form/FormTitle";
import FormButton from "../Form/FormButton";
import ErrorPopup from "../ErrorPopup";
import PersonCard from '../PersonCard';

import { useState, useEffect } from 'react'
import {getOrgApi} from '../../api/axiosHook'

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {v4 as uuid} from 'uuid'
import "../../styles/Profile.css"



const StaffProfile = () => {

    const navigate = useNavigate();

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }
    let token = localStorage.getItem('token')

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

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [accType, setAccType] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState('');


    useEffect(() =>{

        async function fetchProfileData(){

            console.log(auth.ref_id)

            getOrgApi(localStorage.getItem('token')).get(`/${auth.ref_id}`).then((res)=>{
                console.log(res.data)
                setProfileImage(res.data.existingUser.profile_pic)

                auth.profile_pic = res.data.existingUser.profile_pic
                window.sessionStorage.setItem('auth', JSON.stringify(auth));

            }).catch((err)=>{
                console.log(err.response.data.errors)
              })
            
        }

        if(!auth && !token){
            navigate('/login')
        }

        if (auth && auth.ref_id && loading == false){
            fetchProfileData()

            setEmail(auth.email)
            setName(auth.name)
            setAccType(auth.role)
            setLoading(true)

        }
    }, [auth, email, loading, profileImage])

    const uploadImage = (e) => {
        const avatarImageFile = e.target.files[0];
        const fileNameParts = avatarImageFile.name.split(".");
        const fileExtension = fileNameParts[fileNameParts.length - 1];

        const randomUUID = uuid();
        const avatarImageFileName = `${randomUUID}.${fileExtension}`;
        console.log(avatarImageFileName);

        const storage = getStorage();
        const baseRef = ref(storage, avatarImageFileName);
        const storageRef = ref(baseRef, "profile");
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
        e.preventDefault()

        let editedProfile = {
            email: email, 
            name: name, 
            role: accType, 
            profile_pic: profileImage
        }

        console.log('editedProfile', editedProfile)

        getOrgApi(localStorage.getItem('token')).put('/edit-profile', editedProfile)
        .then(res => {
            console.log(res)

            auth.profile_pic = res.data.existingUser.profile_pic
            auth.name = res.data.existingUser.name
            window.sessionStorage.setItem('auth', JSON.stringify(auth));

            setLoading(false)

        }).catch((err)=>{
            console.log(err.response.data.errors)
        })
    }


    return ( 

        auth && <>
        
            <div className="profile">

                <FormTitle title="Profile" />

                <div className="profile_flexbox">

                    <div className="left-column">
                        
                        <PersonCard 
                            name={auth.name} 
                            email={auth.email} 
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

                        <FormInput id="role"
                            inputType="text"
                            label="Role"
                            placeholder="Enter role"
                            value={accType}
                            isDisabled={true}
                            onChange={setAccType}
                        />

                        <br/>

                        <FormButton type="submit" buttonText="Save" />

                        </form>

                    </div>

                </div>

                {
                    error != null ? (
                        <ErrorPopup error={error} setError={setError} />
                    ) : (<></>)
                }

            </div>
        
        </>

    );
}
 
export default StaffProfile;