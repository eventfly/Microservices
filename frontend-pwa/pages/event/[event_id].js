import { useRouter } from 'next/router'
import Link from 'next/link'
import {useState, useEffect} from 'react'

import ImageHeader from '../../components/ImageHeader'
import SponsorContainer from '../../components/SponsorContainer'
import EventDesc from '../../components/EventDesc'
import FAQ from '../../components/FAQ'


const EventDetails = () => {

    const router = useRouter();

    const [event, setEvent] = useState(null);
    const [loaded, setLoaded] = useState(false);

    let sponsors = [
        {
            'id': 1,
            'image': '/github.svg',
        },
        {
            'id': 2,
            'image': '/stackbit.svg',
        },
        {
            'id': 3,
            'image': '/netlify.svg',
        },
        {
            'id': 4,
            'image': '/sticker-mule.svg',
        },
    ]

    let faqs = [
        {
            'id': 1,
            'question': 'How can I get to the venue?',
            'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet elit at nibh ultrices, molestie ullamcorper leo sodales. Pellentesque vehicula ut ipsum sed sodales. Integer finibus scelerisque leo et semper.'
        },
        {
            'id': 2,
            'question': 'What about accomodation for attendees?',
            'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet elit at nibh ultrices, molestie ullamcorper leo sodales. Pellentesque vehicula ut ipsum sed sodales. Integer finibus scelerisque leo et semper.'
        },
        {
            'id': 3,
            'question': 'What about accomodation for attendees?',
            'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet elit at nibh ultrices, molestie ullamcorper leo sodales. Pellentesque vehicula ut ipsum sed sodales. Integer finibus scelerisque leo et semper.'
        },
        {
            'id': 4,
            'question': 'How can I get to the venue?',
            'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet elit at nibh ultrices, molestie ullamcorper leo sodales. Pellentesque vehicula ut ipsum sed sodales. Integer finibus scelerisque leo et semper.'
        },
    ]

    const getEventData = ()=> {
        const { event_id } = router.query;
        console.log("event_id: ", event_id)
    }

    useEffect(()=>{
        if (!loaded) {
            getEventData();
        }
    });


    return ( 

        <div className="event_page_style">

            <ImageHeader />
            <EventDesc />
            <SponsorContainer sponsors={sponsors} />
            <FAQ faqs={faqs} />
        
        </div>

    );
}
 
export default EventDetails;

