// import {Link} from 'react-router-dom'
import CoverImage from './CoverImage'

import FormInput from '../Form/FormInput'
import FormButton from '../Form/FormButton';
import AutoComplete from '../AutoComplete';
import { useState, useEffect } from "react";


const CreateEventStage1 = ({name, setName, tags, setTags, uploadImage, nextStage}) => {

    const [tagOptions, setTagOptions] = useState([]);
    let selectedValues = []

    useEffect(() => {
        tags = tags.map((tag)=>{
            return tag.name 
         })
     
         console.log(tags)
         setTagOptions(tags)
    
    }, [])

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

                <CoverImage uploadImage={uploadImage} />
                <br />

                {/* <FormInput id="tag"
                    inputType="text"
                    label="Event Tags"
                    placeholder="Event Tags"
                    bgColor={'#e5e5e5'}
                    value={tags}
                    onChange={setTags}
                /> */}

                <AutoComplete
                    options={tagOptions}
                />

                <br /><br />

                <FormButton type="submit" buttonText="Next" onClick={nextStage} />

            </div>

        </>

    );
}
 
export default CreateEventStage1;