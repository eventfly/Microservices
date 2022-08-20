// import {Link} from 'react-router-dom'
import CoverImage from '../Event/CoverImage'

import FormInput from '../Form/FormInput'
import FormButton from '../Form/FormButton';
import AutoComplete from '../AutoComplete';
import { useState, useEffect } from "react";


const CreateEventStage1 = ({name, setName, tags, multiSelections, setMultiSelections, uploadImage, nextStage}) => {

    const [tagOptions, setTagOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if(loading == false || tagOptions.length == 0){

            for(let i = 0; i < tags.length; i++){
                tagOptions[i] = tags[i].name
            }

            setTagOptions([...tagOptions])
            setLoading(true)
            //console.log("tagoptions", tagOptions)
        }
    
    }, [tagOptions, loading])

    return ( 

        <>
        
            <div style={{ marginTop: "40px", paddingLeft: "3.5rem" }}>
                <h2>Create New Event (1/3)</h2>
            </div>

            <div className='CreateEvent1'>

                <FormInput id="name"
                    inputType="text"
                    label="Event Name"
                    placeholder="Event Name"
                    bgColor={'#e5e5e5'}
                    value={name}
                    onChange={setName}
                />

                <br />

                <CoverImage uploadImage={uploadImage} height={'500px'} />
                <br />


                <AutoComplete
                    label={'Event Tags'}
                    placeholder={'Choose several tags'}
                    options={tagOptions}
                    setOptions={setTagOptions}
                    multiSelections={multiSelections}
                    setMultiSelections={setMultiSelections}
                    isNewItemsAllowed={true} 
                />

                <br /><br />

                <FormButton type="submit" buttonText="Next" onClick={nextStage} />

            </div>

        </>

    );
}
 
export default CreateEventStage1;