import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import CreateEventStage1 from "../components/CreateEvent/Stage1";
import CreateEventStage2 from "../components/CreateEvent/Stage2";
import CreateEventStage3 from "../components/CreateEvent/Stage3";

import "../styles/CreateEvent.css"
import {getOrgApi} from '../api/axiosHook'
import ErrorPopup from "../components/ErrorPopup";
import {v4 as uuid} from 'uuid'


const CreateEvent = () => {

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }
    let token = localStorage.getItem('token')

    const [stage, setStage] = useState(1);
    const [bannerImage, setBannerImage] = useState(null);

    const [name, setName] = useState('');
    const [type, setType] = useState('Offline');
    const [privacy, setPrivacy] = useState('Public');
    const [desc, setDesc] = useState('');
    const [ticketPrice, setTicketPrice] = useState(0);
    const [promote, setPromote] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [tags, setTags] = useState([])
    const [multiSelections, setMultiSelections] = useState([]);

    const [mailList, setMailList] = useState('')
    const [filter, setFilter] = useState('')

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [location, setLocation] = useState({})

    const navigate = useNavigate();

    const [zoomLink, setZoomLink] = useState("");


    useEffect(() => {
        if(!auth && !token){
            navigate('/login')
        } 

        async function fetchTags(){
            if (auth && auth.ref_id && (loading == false)) {
                
                getOrgApi(localStorage.getItem('token')).get('/tag').then((res)=>{
                    console.log(res.data)

                    for(let i = 0; i < res.data.length; i++){
                        tags[i] = res.data[i]
                    }

                    setLoading(true)
                    setTags([...tags]);
                }).catch((err)=>{
                    console.log(err.response.data.errors)
                  })

                setLoading(true)
                setTags([])
            }
            
        }
        fetchTags()
    
    }, [auth, tags, loading])


    const uploadImage = (e) => {
        // const file = e.target.files[0];
        // const storage = getStorage();
        // const storageRef = ref(storage, file.name);
        // const uploadTask = uploadBytesResumable(storageRef, file);

        const avatarImageFile = e.target.files[0];
        const fileNameParts = avatarImageFile.name.split(".");
        const fileExtension = fileNameParts[fileNameParts.length - 1];

        const randomUUID = uuid();
        const avatarImageFileName = `${randomUUID}.${fileExtension}`;
        console.log(avatarImageFileName);

        const storage = getStorage();
        const baseRef = ref(storage, avatarImageFileName);
        const storageRef = ref(baseRef, "events");
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
                    setBannerImage(downloadUrl);
                    sessionStorage.setItem("event_banner", downloadUrl);
                    document.getElementById("banner").style.backgroundImage = `url(${downloadUrl})`;
                })
            }
        );
    }

    const backStage = () => {
        setStage(stage - 1);
    }

    const nextStage = () => {
        setStage(stage + 1);
    }

    const createEvent = () => {

        let event = {
            type: type,
            start: startDate,
            privacy: privacy,
            name: name,
            banner_url: bannerImage,
            end: endDate,
            desc: desc,
            tags: multiSelections.map((tag)=>{
                return {'name': tag}
            }),
            ticket: ticketPrice,
            mailList: mailList.split(/\r?\n/).filter(element => element),
            filter: filter.split(/\r?\n/).filter(element => element),

            zoomLink: zoomLink,
            location: [location.lng, location.lat]
        }

        event.start = new Date(event.start).toISOString()
        event.end = new Date(event.end).toISOString()

        console.log(event)

        getOrgApi(localStorage.getItem('token')).post('/event', event).then(res => {
            console.log(res)
            navigate('/')

        }).catch(err => {
            console.log(err)
            setError(err.response.data.errors[0].message);
        })

    }


    if (stage === 1) {
        return (
            // auth && (auth.role == 'Organzizer' || auth.role == 'Manager') && 
            <>
                <CreateEventStage1
                    name={name}
                    setName={setName}
                    tags={tags} setTags={setTags}
                    multiSelections={multiSelections}
                    setMultiSelections={setMultiSelections} 
                    uploadImage={uploadImage} 
                    nextStage={nextStage} 
                />

            </>
        );
    }
    else if (stage === 2) {
        return (
            auth && <>
                <CreateEventStage2
                    desc={desc} setDesc={setDesc}
                    ticketPrice={ticketPrice} setTicketPrice={setTicketPrice}
                    type={type} setType={setType} 
                    setPrivacy={setPrivacy}
                    filter={filter} setFilter={setFilter}
                    setStartDate={setStartDate} setEndDate={setEndDate}
                    backStage={backStage} 
                    nextStage={nextStage}
                    setLocation={setLocation}
                    zoomLink={zoomLink} setZoomLink={setZoomLink}


                />

            </>
        );
    }
    else {
        return (
            auth && <>
                <CreateEventStage3
                    promote={promote} setPromote={setPromote}
                    mailList={mailList} setMailList={setMailList} 
                    backStage={backStage} 
                    createEvent={createEvent} 
                />

                {
                    error != null ? (
                        <ErrorPopup error={error} setError={setError} />
                    ) : (<></>)
                }

            </>
        );
    }
}

export default CreateEvent;