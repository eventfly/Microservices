import { Link } from 'react-router-dom'
// import "../../styles/CreateEvent.css"

import PromoteEvent from './PromoteEvent'
import MailingList from './MailingList'

import FormTextArea from '../Form/FormTextArea';
import FormButton from '../Form/FormButton';
import FormSelect from '../Form/FormSelect';


const CreateEventStage3 = ({ promote, setPromote, mailList, setMailList, backStage, createEvent }) => {

    let promoteOptions = [
        {
            'id': 1,
            'name': 'Yes'
        },
        {
            'id': 2,
            'name': 'No'
        }
    ]

    const activeMailingList = (
        <FormTextArea id="mailingList"
            label="Mailing List"
            placeholder="Mailing List"
            disabled={false}
            height={'150px'}
            bgColor={'#e5e5e5'}
            value={mailList}
            onChange={setMailList}
        />
    )

    const inActiveMailingList = (
        <FormTextArea id="mailingList"
            label="Mailing List"
            placeholder="Mailing List"
            disabled={true}
            height={'150px'}
            bgColor={'#F1F1F3'}
            value={mailList}
            onChange={setMailList}
        />
    )


    return (

        <>

            <div style={{ marginTop: "40px", paddingLeft: "3.5rem" }}>
                <h2>Create New Event (3/3)</h2>
            </div>

            <div className='CreateEvent3'>

                <div className='left-column'>
                    {/* <PromoteEvent /> */}

                    <FormSelect id="promote"
                        label="Promote Event?"
                        bgColor={'#e5e5e5'}
                        options={promoteOptions}
                        onChange={setPromote}
                    />

                </div>

                <div className='right-column'>
                    {/* <MailingList /> */}

                    {
                        promote === 'Yes' ? activeMailingList : inActiveMailingList
                    }




                    {/* <br></br><br></br>
                    <br></br><br></br> */}
                </div>


                <div className='btn-group'>
                    
                    <div className='left-button'>
                        <FormButton type="button" buttonText="Back" onClick={backStage} />
                    </div>

                    <Link to={`/`}>
                        <FormButton type="button" buttonText="Create Event" onClick={() => createEvent()} />
                    </Link>

                </div>

                {/* <div className='Create3ButtonClass'>
                    <button className='Create3Button' onClick={backStage}>
                        Back
                    </button>

                    <Link to={`/`}>
                        <button className='Create3Button' onClick={() => createEvent()}>
                            Create Event
                        </button>
                    </Link>

                </div> */}

            </div>

        </>

    );
}

export default CreateEventStage3;