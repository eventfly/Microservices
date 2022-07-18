import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import CreateEventStage1 from "../components/CreateEvent/Stage1";
import CreateEventStage2 from "../components/CreateEvent/Stage2";
import CreateEventStage3 from "../components/CreateEvent/Stage3";
import axios from 'axios';

import useRequest from '../hooks/use-request';


const CreateEvent = () => {

    const [stage, setStage] = useState(1);
    const [bannerImage, setBannerImage] = useState(null);

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

    const saveDataOfStage1 = () => {
        sessionStorage.setItem("event_name", document.getElementById("eventName").value);
        sessionStorage.setItem("event_tags", document.getElementById("eventTag").value);
    }

    const saveDataOfStage2 = () => {
        sessionStorage.setItem("event_desc", document.getElementById("description").value);
        sessionStorage.setItem("event_ticket", document.getElementById("price").value);
        sessionStorage.setItem("event_start", document.getElementById("start_date").value);
        sessionStorage.setItem("event_end", document.getElementById("end_date").value);
        sessionStorage.setItem("event_type", document.getElementById("event_type").value);
        sessionStorage.setItem("event_privacy", document.getElementById("event_privacy").value);
        sessionStorage.setItem("event_filter", document.getElementById("email_filter").value);
    }

    const saveDataOfStage3 = () => {
        sessionStorage.setItem("event_promotion", document.getElementById("promotion").value);
        sessionStorage.setItem("event_maillist", document.getElementById("mailing_list").value);

        setStage(1)

        createEvent()
    }

    const backStage = () => {
        if (stage === 2) {
            saveDataOfStage2()
        }
        else if (stage === 3) {
            saveDataOfStage3()
        }

        setStage(stage - 1);
    }

    const nextStage = () => {
        if (stage === 1) {
            saveDataOfStage1()
        }
        else if (stage === 2) {
            saveDataOfStage2()
        }

        setStage(stage + 1);
    }

    const createEvent = () => {

        let event = {
            type: sessionStorage.getItem('event_type'),
            start: sessionStorage.getItem('event_start'),
            privacy: sessionStorage.getItem('event_privacy'),
            name: sessionStorage.getItem('event_name'),
            banner_url: bannerImage,
            end: sessionStorage.getItem('event_end'),
            desc: sessionStorage.getItem('event_desc'),
            tags: [
                sessionStorage.getItem('event_tags')
            ],
            ticket: parseInt(sessionStorage.getItem('event_ticket')),
            mailList: [
                sessionStorage.getItem('event_maillist')
            ],
            filter: [
                sessionStorage.getItem('event_filter')
            ]
        }

        event.start = new Date(event.start).toISOString()
        event.end = new Date(event.end).toISOString()

        console.log(event)

        axios.post('/api/org/event', event).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })




        //console.log(res)
    }


    if (stage === 1) {
        return (
            <>
                <CreateEventStage1 uploadImage={uploadImage} nextStage={nextStage} />
            </>
        );
    }
    else if (stage === 2) {
        return (
            <>
                <CreateEventStage2 backStage={backStage} nextStage={nextStage} />
            </>
        );
    }
    else {
        return (
            <>
                <CreateEventStage3 backStage={backStage} createEvent={saveDataOfStage3} />
            </>
        );
    }
}

export default CreateEvent;