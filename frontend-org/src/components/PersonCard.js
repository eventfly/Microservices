import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import image from '../images/avatar.png'
import '../styles/PersonCard.css'
import PasswordModal from './Profile/PasswordModal';


const PersonCard = ({uploadImage, name, email, role}) => {

    const clickInputButton = (e) => {
        document.getElementById("uploadDP").click();
    }

    return ( 

        <>
        
            <Card style={{ width: '80%' }}>
                <Card.Img variant="top" 
                    src={image}
                    onClick={clickInputButton}
                    style={{
                        width: '50%',
                        height: '50%',
                        alignSelf: 'center',
                        marginTop: '30px',
                        cursor: 'pointer'
                    }}
                />

                <input type={"file"} onChange={uploadImage} id={"uploadDP"} hidden />

                
                <Card.Body style={{
                    marginTop: '30px'
                }}>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                    {email}
                    </Card.Text>
                </Card.Body>


                <Card.Body>
                    {/* <Card.Link href="#">Change Password</Card.Link> */}

                    <PasswordModal email={email} role={role}/>

                </Card.Body>

            </Card>
        
        </>

    );
}
 
export default PersonCard;