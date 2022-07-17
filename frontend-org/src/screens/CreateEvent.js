import { useState } from "react";

import CreateEventStage1 from "../components/CreateEvent/Stage1";
import CreateEventStage2 from "../components/CreateEvent/Stage2";
import CreateEventStage3 from "../components/CreateEvent/Stage3";


const CreateEvent = () => {

    const [stage, setStage] = useState(1);

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
    }

    const backStage = () => {
        if(stage === 2){
            saveDataOfStage2()
        }
        else if(stage === 3){
            saveDataOfStage3()
        }

        setStage(stage-1);
    }

    const nextStage = () => {
        if(stage === 1){
            saveDataOfStage1()
        }
        else if(stage === 2){
            saveDataOfStage2()
        }

        setStage(stage+1);
    }


    if(stage === 1){
        return (
            <>  
                <CreateEventStage1 nextStage={nextStage} />
            </>
        );
    }
    else if(stage === 2){
        return (
            <>  
                <CreateEventStage2 backStage={backStage} nextStage={nextStage} />
            </>
        );
    }
    else{
        return (
            <>  
                <CreateEventStage3 backStage={backStage} createEvent={saveDataOfStage3} />
            </>
        );
    }
}
 
export default CreateEvent;