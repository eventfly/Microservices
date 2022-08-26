import {Link} from 'react-router-dom';

const EventPreview = ({event}) => {
   
    // url(https://cdn.pixabay.com/photo/2019/07/16/20/48/dolomiti-4342572_960_720.jpg)`,

    return (
        <>
        
        <Link to={`/event/${event.id}/profile`}> 
            <div className="event-preview" style={{
                backgroundImage:
                    `linear-gradient(
                        rgba(0, 0, 0, 0.5), 
                        rgba(0, 0, 0, 0.5)
                    ),
                    url(${event.banner_url})`,

                backgroundSize: 'cover',            
                height: '10rem',
                width: '20rem',
                borderRadius: '0.7rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '1rem',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
            }}> 
                <span style={{
                    color: 'white',
                    fontSize: '1.1rem',
                    maxWidth: '95%',
                    wordWrap: 'break-word',
                    textAlign: 'center',
                    
                }}>
                    {event.name}
                </span>
            </div>
        </Link>

        </>
     );
}
 
export default EventPreview;