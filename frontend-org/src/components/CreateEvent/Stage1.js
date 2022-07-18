// import {Link} from 'react-router-dom'

// import EventName from './EventName'
// import EventTag from './EventTag'
import CoverImage from './CoverImage'

import FormInput from '../Form/FormInput'
import FormButton from '../Form/FormButton';


const CreateEventStage1 = ({name, setName, tags, setTags, uploadImage, nextStage}) => {
    return ( 

        <>
        
            <div style={{ marginTop: "40px", paddingLeft: "3.5rem" }}>
                <h2>Create New Event (1/3)</h2>
            </div>

            <div className='CreateEvent1'>

                {/* <EventName /> */}

                <FormInput id="name"
                    inputType="text"
                    label="Event Name"
                    placeholder="Event Name"
                    value={name}
                    onChange={setName}
                />

                <br />

                <CoverImage uploadImage={uploadImage} />
                <br />

                {/* <EventTag /> */}

                <FormInput id="tag"
                    inputType="text"
                    label="Event Tags"
                    placeholder="Event Tags"
                    value={tags}
                    onChange={setTags}
                />

                <br /><br /><br />

                <FormButton type="submit" buttonText="Next" onClick={nextStage} />

                {/* <button className='Create1Button' onClick={nextStage}>
                    Next
                </button> */}
                
                

            </div>

        </>

    );
}
 
export default CreateEventStage1;