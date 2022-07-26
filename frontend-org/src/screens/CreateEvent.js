import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import CreateEventStage1 from "../components/CreateEvent/Stage1";
import CreateEventStage2 from "../components/CreateEvent/Stage2";
import CreateEventStage3 from "../components/CreateEvent/Stage3";
import axios from 'axios';

import "../styles/CreateEvent.css"


const CreateEvent = () => {

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

    const [tags, setTags] = useState('')
    const [mailList, setMailList] = useState('')
    const [filter, setFilter] = useState('')


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
            tags: tags,
            ticket: ticketPrice,
            mailList: mailList.split(/\r?\n/).filter(element => element),
            filter: filter.split(/\r?\n/).filter(element => element)
        }

        event.start = new Date(event.start).toISOString()
        event.end = new Date(event.end).toISOString()

        console.log(event)

        axios.post('http://localhost:3001/api/org/event', event, {
            headers: {
               authorization: ' xxxxxxxxxx' ,
               'Content-Type': 'application/json'
            } 
         }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })

    }


    if (stage === 1) {
        return (
            <>
                <CreateEventStage1
                    name={name}
                    setName={setName}
                    tags={tags}
                    setTags={setTags} 
                    uploadImage={uploadImage} 
                    nextStage={nextStage} 
                />
            </>
        );
    }
    else if (stage === 2) {
        return (
            <>
                <CreateEventStage2
                    desc={desc} setDesc={setDesc}
                    ticketPrice={ticketPrice} setTicketPrice={setTicketPrice}
                    setType={setType} setPrivacy={setPrivacy}
                    filter={filter} setFilter={setFilter}
                    setStartDate={setStartDate} setEndDate={setEndDate}
                    backStage={backStage} 
                    nextStage={nextStage} 
                />
            </>
        );
    }
    else {
        return (
            <>
                <CreateEventStage3
                    promote={promote} setPromote={setPromote}
                    mailList={mailList} setMailList={setMailList} 
                    backStage={backStage} 
                    createEvent={createEvent} 
                />
            </>
        );
    }
}

export default CreateEvent;